# Quran API

This is a Node.js-based API that provides access to Quran translations and explanations (tafseer). It allows users to retrieve full Quran data, specific chapters, and perform text searches within the Quran.

## Features

- Retrieve full Quran translations and explanations
- Get specific chapters with translations and explanations
- Search functionality to find verses containing specific terms
- CORS-enabled for cross-origin requests

## Prerequisites

- Node.js (v12 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ibadkhan1996/quran-api.git
   cd quran-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Ensure you have the necessary data files:
   - `data/translations.txt`: Contains Quran translations
   - `data/tasfeer.txt`: Contains Quran explanations (tafseer)

## Usage

To start the server:

```
npm start
```

The server will start on `http://localhost:3000` by default, or on the port specified by the `PORT` environment variable.

## API Endpoints

1. **Get Full Quran Data**
   - Endpoint: `GET /api/quran`
   - Returns all Quran translations and explanations

2. **Get Specific Chapter**
   - Endpoint: `GET /api/quran/:chapter`
   - Returns translations and explanations for a specific chapter
   - Example: `/api/quran/1` returns data for Surah Al-Fatihah

3. **Search Quran**
   - Endpoint: `GET /api/search?q=:searchTerm`
   - Searches for verses containing the specified term
   - Example: `/api/search?q=mercy` returns all verses containing the word "mercy"

4. **Root Route**
   - Endpoint: `GET /`
   - Returns a welcome message

## Error Handling

The API includes basic error handling:
- 404 errors for chapters not found
- 500 errors for server-side issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPLv3). See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Heroku for hosting the API
- [Mention any third-party data sources or libraries used]

## Contact

Ibad Khan

Project Link: [https://github.com/ibadkhan1996/quran-api](https://github.com/ibadkhan1996/quran-api)
