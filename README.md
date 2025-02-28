# 📈 Stock Tracker Application  

A real-time stock tracking application where users can:  
- Search for stocks by name or ticker symbol.  
- View live stock price updates.  
- Analyze historical price trends.  
- Manage a watchlist of selected stocks.  

## 🚀 Features  
- ✅ **Search for stocks dynamically** (without a search button, using `useDebounce`).  
- ✅ **Live stock price updates via WebSocket**.  
- ✅ **Pagination support for better navigation**.  
- ✅ **Optimized state management using Redux Toolkit**.  
- ✅ **Clean and responsive UI using Tailwind CSS**. 
- ✅ **Firebase Authentication with Email & Password login.** 

## 🏗️ Requirements  
- **Framework**: Next.js 15  
- **Components**: Proper use of Server Components (RSCs) vs. Client Components  
- **API Integration**: API Integration: Supports stock APIs like Finnhub, Polygon.io
- **State Management**: Uses Redux Toolkit  
- **Performance Optimization**: Turbopack, caching, and efficient data fetching strategies  

## Authentication
The app uses Firebase Authentication for user authentication, allowing users to sign in using their email and password.

##  APIs Used
The application integrates with multiple stock market data providers:

- **Finnhub API**: Used for fetching stock price data and real-time updates.
- **Polygon.io API**: Used for historical stock market data and financial insights
- **Firebase Authentication**: Manages user authentication.


## Architectural Decisions

- **Next.js with App Router**: Ensures optimized rendering and performance.

- **Redux Toolkit for State Management**: Efficient handling of global state for stocks and watchlists.

- **WebSockets for Live Data**: Fetches real-time stock price updates without frequent HTTP requests.

- **Firebase Authentication**: Secure and scalable authentication with minimal backend setup.

- **Tailwind CSS**: Rapid UI development with a responsive design.

## Trade-offs and Optimizations

- **Turbopack for Faster Builds**: Next.js 15 with Turbopack ensures improved performance.

- **Debounced Search**: Reduces API calls while providing a smooth search experience.

- **Server-Side Fetching for SEO**: Ensures stock data is indexed correctly for better discoverability.

- **Local Storage for Watchlist**: Provides a fast and offline-capable watchlist experience.



## 📦 Installation  
To set up the project locally, follow these steps:  

```sh
# Navigate to the project directory
cd stock-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

  ## Environment Variables
  Create a .env file in the root directory and add the following environment variables:

```sh
NEXT_PUBLIC_FINNHUB_API_KEY="your_finnhub_api_key"
NEXT_PUBLIC_BACKEND_API_URL="http://localhost:3000"
NEXT_PUBLIC_FINNHUB_API_URL="https://finnhub.io/api/v1"
NEXT_PUBLIC_POLYGON_API_URL="https://api.polygon.io/v2"
NEXT_PUBLIC_POLYGON_API_KEY="your_polygon_api_key"

NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"
```


