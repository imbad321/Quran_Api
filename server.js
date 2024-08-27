const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// File paths
const translationsPath = path.join(__dirname, 'data', 'translations.txt');
const explanationsPath = path.join(__dirname, 'data', 'tasfeer.txt');

// Function to parse the translations file
async function parseTranslations() {
  const content = await fs.readFile(translationsPath, 'utf8');
  const chapters = content.split(/Chapter \d+:/);
  
  return chapters.slice(1).map((chapter, index) => {
    const [name, ...verses] = chapter.trim().split('\n');
    return {
      chapter: index + 1,
      name: name.trim(),
      verses: verses.map(verse => {
        const [number, text] = verse.split(/Verse \d+:\s*/);
        return { number: parseInt(number), text: text.trim() };
      })
    };
  });
}

// Function to parse the explanations file
async function parseExplanations() {
  const content = await fs.readFile(explanationsPath, 'utf8');
  const chapters = content.split(/Chapter \d+:/);
  
  return chapters.slice(1).map((chapter, index) => {
    const [name, author, ...text] = chapter.trim().split('\n');
    return {
      chapter: index + 1,
      name: name.trim(),
      author: author.replace('By ', '').trim(),
      text: text.join('\n').trim()
    };
  });
}

// API endpoint to get all data
app.get('/api/quran', async (req, res) => {
  try {
    const translations = await parseTranslations();
    const explanations = await parseExplanations();
    res.json({ translations, explanations });
  } catch (error) {
    console.error('Error reading Quran data:', error);
    res.status(500).json({ error: 'Error reading Quran data' });
  }
});

// API endpoint to get a specific chapter
app.get('/api/quran/:chapter', async (req, res) => {
  try {
    const chapterNum = parseInt(req.params.chapter);
    const translations = await parseTranslations();
    const explanations = await parseExplanations();
    
    const chapterTranslation = translations.find(c => c.chapter === chapterNum);
    const chapterExplanation = explanations.find(c => c.chapter === chapterNum);
    
    if (chapterTranslation && chapterExplanation) {
      res.json({ translation: chapterTranslation, explanation: chapterExplanation });
    } else {
      res.status(404).json({ error: 'Chapter not found' });
    }
  } catch (error) {
    console.error('Error reading chapter data:', error);
    res.status(500).json({ error: 'Error reading chapter data' });
  }
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.q.toLowerCase();
    const translations = await parseTranslations();
    const explanations = await parseExplanations();

    const results = translations.flatMap(chapter => 
      chapter.verses
        .filter(verse => verse.text.toLowerCase().includes(searchTerm))
        .map(verse => ({
          chapter: chapter.chapter,
          verse: verse.number,
          text: verse.text
        }))
    );

    res.json(results);
  } catch (error) {
    console.error('Error searching Quran data:', error);
    res.status(500).json({ error: 'Error searching Quran data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Quran API server running at http://localhost:${port}`);
});