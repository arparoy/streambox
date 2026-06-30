# StreamBox

StreamBox is a completely static, high-performance movie catalog website built with Next.js 15, React, TypeScript, and Tailwind CSS. It requires no backend, database, or API. All content is generated from local JSON files and images.

## Features

- **No Database Needed**: All movie data is driven by `data/movies.json`.
- **Fast and Static**: Built using Next.js App Router static features, optimized for Vercel Free hosting.
- **Search and Filter**: Instantly search movies by title, director, cast, or genre.
- **Favorites**: Save favorites using browser local storage.

## How to Add New Movies

To add a new movie to StreamBox, follow these simple steps:

### 1. Add the Movie Cover Image
1. Download a high-quality movie poster image (preferably in JPG or PNG format).
2. Rename the image to a simple, web-friendly format (e.g., `the-matrix.jpg`).
3. Place the image file in the `public/movies/` folder (create the folder if it doesn't exist, though `picsum.photos` placeholders are used by default if preferred).

### 2. Update `movies.json`
1. Open the `data/movies.json` file.
2. Add a new movie object to the JSON array. Follow this exact structure:

```json
{
  "id": "unique-movie-id-here",
  "title": "Movie Title",
  "year": 2024,
  "genre": ["Action", "Sci-Fi"],
  "language": "English",
  "quality": "1080p Web-DL",
  "duration": "2h 15m",
  "size": "2.5 GB",
  "rating": "8.5",
  "cover": "/movies/your-movie-cover.jpg",
  "description": "A compelling description of the movie...",
  "cast": ["Actor One", "Actor Two"],
  "director": "Director Name",
  "youtubeTrailer": "https://www.youtube.com/watch?v=your-trailer-id",
  "downloads": [
    { "quality": "1080p", "url": "https://example.com/download-link" }
  ],
  "backupLinks": [
    { "name": "Backup Server 1", "url": "https://example.com/backup-link" }
  ]
}
```

### 3. Movie Display Types

- **Regular Movie**: Just add the JSON structure above. It will show up in the Latest Releases grid and search results.
- **Trending Movie**: Add `"trending": true` to the JSON object. This will pin it to the "Trending Now" section on the homepage.
  ```json
  "trending": true,
  ```
- **Featured Movie (Slider)**: The hero slider automatically picks the top 5 newest movies based on their `"year"`. To make a movie featured in the top slider, just make sure its `"year"` is among the 5 most recent in the list.

4. Save the file. The website will automatically update and generate the new movie pages.

## Development

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

## Deployment

The project is optimized for [Vercel](https://vercel.com). Simply push the repository to GitHub, connect it to Vercel, and it will deploy instantly with zero configuration needed.
