# BoxMovie

BoxMovie is a modern movie discovery and watchlist management application built with Next.js 15.5.2, TypeScript, Firebase, and the OMDB API. Users can search for movies, view detailed movie information, and manage a personalized watchlist that persists across sessions using Firebase Firestore and redux-persist. The app features a sleek, responsive UI with custom Tailwind CSS gradients and shadcn/ui components, secure authentication, and drag-and-drop watchlist reordering.

## Features 

- **Movie Search**: Search for movies using the OMDB API with filters for year and type
- **Movie Details**: View comprehensive movie details (title, plot, director, actors, etc.) on a dynamic route (`/movie/[id]`)
- **Watchlist Management**: Add, remove, and reorder movies in a user-specific watchlist, persisted in Firebase Firestore
- **Protected Routes**: The watchlist page (`/watchlist`) is accessible only to authenticated users
- **Drag-and-Drop**: Reorder watchlist items using dnd-kit
- **Responsive Design**: Mobile-friendly UI with custom Tailwind CSS gradients (`bg-gradient-card`, `gradient-text`)
- **Authentication**: Firebase Authentication with email/password sign-in, sign-up, and email verification
- **State Management**: Redux with RTK Query for API calls and redux-persist for local watchlist persistence
- **Error Handling**: Sonner toasts for user feedback on actions and errors
- **API Route**: Secure Next.js API route (`/api/watchlist`) for syncing watchlist data with Firestore

## Tech Stack 🛠️

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15.5.2, React, TypeScript |
| **State Management** | Redux Toolkit, RTK Query, redux-persist |
| **Backend** | Firebase Authentication, Firestore |
| **API** | OMDB API for movie data |
| **Styling** | Tailwind CSS, shadcn/ui, custom gradients |
| **Libraries** | dnd-kit, lucide-react, sonner, next-themes |
| **Build Tool** | Node.js |

## Prerequisites 

- **Node.js**: v18 or higher
- **Firebase Account**: For authentication and Firestore
- **OMDB API Key**: Obtain from [OMDB API](https://www.omdbapi.com/)
- **Firebase CLI** (optional for local deployment): Install via `npm install -g firebase-tools`

## Setup Instructions 

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cinevault
```

### 2. Install Dependencies

```bash
npm install
```

**Dependencies (from package.json):**
```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "next": "15.5.2",
    "lucide-react": "^0.441.0",
    "firebase": "^10.12.2",
    "sonner": "^1.5.0",
    "next-themes": "^0.3.0",
    "redux-persist": "^6.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_OMDB_API_KEY=your-omdb-api-key
```

- **Firebase Keys**: Obtain from Firebase Console > Project Settings
- **OMDB API Key**: Get from [OMDB API](https://www.omdbapi.com/)

### 4. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project or select an existing one
3. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
4. **Enable Firestore Database**:
   - Go to Firestore Database > Create Database
   - Choose Production mode and a region (e.g., us-central1)
5. **Set Firestore Security Rules** (Firestore > Rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/watchlist/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish**.

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Sign in or sign up to access the watchlist (`/watchlist`).

### 6. (Optional) Deploy Firestore Rules with Firebase CLI

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Log in**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase**:
   ```bash
   firebase init firestore
   ```

4. Update `firestore.rules` with the above rules

5. **Deploy**:
   ```bash
   firebase deploy --only firestore:rules
   ```

## File Structure 

```
cinevault/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── watchlist/
│   │   │       └── route.ts        # API route for watchlist CRUD
│   │   ├── auth/
│   │   │   └── page.tsx            # Authentication page
│   │   ├── movie/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Movie Detail Page
│   │   ├── watchlist/
│   │   │   └── page.tsx            # Watchlist Page (protected)
│   │   ├── globals.css             # Tailwind CSS with custom gradients
│   │   ├── layout.tsx              # Root layout with ThemeProvider, Toaster
│   │   └── page.tsx                # Landing page with movie search
│   ├── components/
│   │   ├── Header.tsx              # Navigation bar
│   │   ├── MovieCard.tsx           # Movie card component
│   │   ├── ui/                    # shadcn/ui components (Button, Card, etc.)
│   │   └── AuthForm.tsx           # Sign-in/sign-up form
│   ├── lib/
│   │   └── firebase.ts            # Firebase config (auth, db)
│   ├── store/
│   │   ├── api/
│   │   │   └── movieApi.ts        # RTK Query for OMDB API
│   │   ├── slices/
│   │   │   ├── authSlice.ts       # Redux slice for authentication
│   │   │   └── watchlistSlice.ts  # Redux slice for watchlist
│   │   └── index.ts               # Redux store with redux-persist
│   ├── hooks/
│   │   └── redux.ts               # Custom Redux hooks
│   └── types/
│       └── movie.ts               # Movie and SearchResponse interfaces
├── public/
│   └── placeholder.jpg             # Fallback image for movie posters
├── .env.local                     # Environment variables
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Usage 

### Sign In/Sign Up
- Navigate to `/auth` to create an account or sign in
- Email verification is required for new accounts

### Search Movies
- Use the search bar on the homepage (`/`) to find movies
- Click a movie poster to view details (`/movie/[id]`)

### Manage Watchlist
- Add/remove movies from the watchlist on `/movie/[id]` or homepage
- View and reorder watchlist on `/watchlist` (authenticated users only)
- Drag-and-drop to reorder movies

### Sign Out
- Click "Sign Out" in the header to clear session and watchlist

## Troubleshooting 

### 1. Shared Watchlist Across Users

**Symptom**: All users see the same watchlist.

**Solution**:
- **Check Firestore**: Go to Firebase Console > Firestore > Data. Verify `users/{userId}/watchlist/movies` is unique per user (`userId` is the Firebase `uid`). Delete incorrect data if shared.
- **Check Logs**: In `watchlist/page.tsx`, check `console.log("Watchlist for user", user?.uid, ":", watchlist)`. Ensure `user.uid` matches the Firestore path.
- **Verify Security Rules**: Ensure Firestore rules restrict access to `request.auth.uid == userId`.
- **Clear Redux State**: Sign out to trigger `clearWatchlist` in `Header.tsx`. Clear localStorage in DevTools (Application > Storage > Local Storage).

### 2. Redux-Persist Error

**Symptom**: `redux-persist failed to create sync storage. falling back to noop storage.`

**Solution**:
- **Verify Storage**: Ensure `src/store/index.ts` uses the custom `createWebStorage` function.
- **Check localStorage**: In DevTools (Application > Storage > Local Storage) for `persist:root`.
- **Test in Incognito**: Open an incognito window to test for localStorage restrictions.
- **Clear Cache**:
  ```bash
  rm -rf .next
  npm run dev
  ```

### 3. Duplicate Key Error (tt2975590)

**Solution**:
- **Check Logs**: In `watchlist/page.tsx`, check `console.log("Unique IMDb IDs:", uniqueImdbIDs.size, "Total items:", watchlist.length)`. If duplicates exist, clear Firestore data for the user and retest.
- **Fix**: Ensure `addToWatchlist` in `watchlistSlice.ts` checks for existing `imdbID`.

### 4. OMDB API Key Issues

**Solution**:
- **Verify Key**: Check `.env.local` for `NEXT_PUBLIC_OMDB_API_KEY`.
- **Test**:
  ```bash
  curl "https://www.omdbapi.com/?apikey=your-omdb-api-key&i=tt2975590&plot=full"
  ```
- **Check movieApi.ts**:
  ```typescript
  const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  if (!OMDB_API_KEY) {
    throw new Error("OMDB API key is missing");
  }
  ```

### 5. Gradient Rendering Issues

**Solution**:
- **Verify globals.css**:
  ```css
  @layer base {
    :root {
      --cinema-purple: hsl(262 83% 58%);
      --cinema-gold: hsl(45 93% 47%);
      --cinema-card: hsl(220 15% 10%);
      --cinema-border: hsl(220 15% 20%);
      --cinema-dark: hsl(220 15% 8%);
      --gradient-hero: linear-gradient(135deg, hsl(262 83% 58% / 0.7), hsl(45 93% 47% / 0.7));
      --gradient-card: linear-gradient(145deg, hsl(220 15% 10%), hsl(220 15% 20%));
      --gradient-button: linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 48%));
      --shadow-card: 0 8px 32px hsl(220 15% 4% / 0.4);
    }
    .gradient-text {
      background: linear-gradient(135deg, var(--cinema-purple), var(--cinema-gold));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  ```

- **Verify tailwind.config.js**:
  ```javascript
  export default {
    content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        backgroundImage: {
          "gradient-hero": "linear-gradient(135deg, hsl(262 83% 58% / 0.7), hsl(45 93% 47% / 0.7))",
          "gradient-card": "linear-gradient(145deg, hsl(220 15% 10%), hsl(220 15% 20%))",
          "gradient-button": "linear-gradient(135deg, hsl(262 83% 58%), hsl(262 83% 48%))",
        },
        colors: {
          "cinema-purple": "hsl(262 83% 58%)",
          "cinema-gold": "hsl(45 93% 47%)",
        },
        boxShadow: {
          "card": "0 8px 32px hsl(220 15% 4% / 0.4)",
        },
      },
    },
    plugins: [],
  };
  ```

- **Clear Cache**:
  ```bash
  rm -rf .next
  npm run dev
  ```

### 6. Firebase Authentication Issues

**Solution**:
- **Verify Firebase Config**: Check `.env.local` for all Firebase keys.
- **Ensure src/lib/firebase.ts validates keys**:
  ```typescript
  for (const key of requiredConfigKeys) {
    if (!firebaseConfig[key]) {
      throw new Error(`Missing Firebase config: ${key}`);
    }
  }
  ```
- **Test Authentication**: Sign in/out via `/auth` and check `auth.currentUser` in DevTools.

### 7. Firestore Data Issues

**Solution**:
- **Verify Data**: In Firebase Console > Firestore > Data, check `users/{userId}/watchlist/movies`. Ensure each user has a unique `userId` document.
- **Clear Incorrect Data**: Delete shared or incorrect documents in Firestore.
- **Test API Route**:
  ```bash
  curl -H "Authorization: Bearer <firebase-id-token>" http://localhost:3000/api/watchlist
  ```

- **Get ID token**:
  ```typescript
  // In watchlist/page.tsx
  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => console.log("ID Token:", token));
    }
  }, [user]);
  ```

