# jina-deepsearch-v1 Documentation

## Overview

jina-deepsearch-v1 is a web application that showcases an AI model with deep search capabilities. The website features a Grok AI-inspired dark theme interface with smooth animations and a minimalistic design. It simulates the functionality of Jina AI's DeepSearch and provides a user-friendly interface for performing deep searches with or without an API key.

## Features

### 1. Deep Search Capability
- Simulates AI-powered deep search functionality
- Provides contextually relevant search results
- Supports both text queries and file uploads

### 2. Grok AI-Inspired UI
- Minimalistic dark theme design
- Clean, uncluttered interface
- Modern aesthetic with smooth transitions

### 3. Search Process Animation
- Dynamic visualization of the deep search process
- Particle effects with connecting paths
- Expanding waves animation
- Visual representation of the model's reasoning process

### 4. Jina API Key Settings
- Dedicated settings section for API key management
- Clear labeling about higher rate limits with API key
- Toggle to enable/disable API key usage

### 5. Dual Query Modes
- With API Key: Higher request rate limit
- Without API Key: Limited to 3 requests per minute
- Rate limit alerts when limit is reached

### 6. File Upload
- Support for multiple file formats: txt, pdf, png, jpeg, webp
- Drag and drop functionality
- File preview capabilities
- Integration with search process

### 7. Responsive Design
- Works on desktop, tablet, and mobile devices
- Adaptive layout for different screen sizes
- Mobile-specific sidebar for better user experience

## Technical Architecture

### Frontend Framework
- Next.js 15.1.4
- React with TypeScript
- Tailwind CSS for styling

### Component Structure
- **Layout Components**: Header, Footer, ResponsiveContainer
- **Search Components**: SearchBar, SearchResults, SearchFilter, SearchStatus
- **Animation Components**: SearchAnimation, ThinkingAnimation
- **Settings Components**: ApiKeySettings
- **Upload Components**: FileUpload, FilePreview

### State Management
- React Hooks for local state management
- Context API for global state (SearchService)

### Performance Optimizations
- Loading states for better user experience
- Error handling with fallback UI
- Responsive design for all devices
- Animation optimizations

## User Guide

### Performing a Search
1. Enter your query in the search bar at the top of the page
2. Click the search button or press Enter
3. View the search animation while results are being processed
4. Browse through the search results

### Using API Key
1. Click the Settings button
2. Toggle "Use Jina API Key" to enable API key usage
3. Enter your API key in the input field
4. Click Save to store your API key
5. Enjoy higher rate limits for your searches

### Uploading Files
1. Find the Upload Files section in the sidebar
2. Click the paperclip button or drag and drop files
3. Supported formats: txt, pdf, png, jpeg, webp
4. Uploaded files will be integrated into your search queries

### Mobile Usage
1. Use the search bar at the top of the screen
2. Click the Options button to access settings and file upload
3. The sidebar will appear as a slide-out panel
4. All functionality is available on mobile devices

## Development Guide

### Project Structure
```
jina-deepsearch-v1/
├── src/
│   ├── app/                # Next.js pages
│   │   ├── page.tsx        # Main page
│   │   ├── layout.tsx      # Root layout
│   │   ├── loading.tsx     # Loading state
│   │   ├── error.tsx       # Error handling
│   │   └── not-found.tsx   # 404 page
│   ├── components/
│   │   ├── animation/      # Animation components
│   │   ├── layout/         # Layout components
│   │   ├── search/         # Search-related components
│   │   ├── settings/       # Settings components
│   │   ├── ui/             # UI components
│   │   └── upload/         # File upload components
│   └── lib/
│       └── utils.ts        # Utility functions
├── public/                 # Static assets
└── .next/                  # Build output
```

### Running Locally
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`
5. Start production server: `npm start`

## Deployment

The website is deployed and accessible at:
https://3000-iruucfltvzixposz0rypb-28d8aea0.manus.computer

This is a temporary deployment for demonstration purposes. For production deployment, consider using services like Vercel, Netlify, or AWS Amplify that have native support for Next.js applications.

## Limitations and Future Improvements

### Current Limitations
- Search functionality is simulated and doesn't connect to an actual Jina AI backend
- API key validation is not implemented (any string is accepted as a valid key)
- File processing is simulated and doesn't perform actual content analysis

### Potential Improvements
- Integration with actual Jina AI DeepSearch API
- Proper API key validation and management
- Real file content processing and analysis
- User authentication and saved searches
- More advanced search filters and options
- Enhanced visualization of search results
- Performance optimizations for larger result sets

## Credits

- Design inspired by Grok AI's chat interface
- Search functionality inspired by Jina AI's DeepSearch
- Built with Next.js, React, and Tailwind CSS
