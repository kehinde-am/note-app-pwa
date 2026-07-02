# Note Taking PWA

A progressive web app for creating, editing, and sharing notes with offline support. Built with Gatsby and Firebase.

## Features

- Email/password, Google, and Facebook authentication
- Create, edit, delete, and search notes
- Share notes via link
- Offline access through service worker caching
- Installable PWA on supported devices

## Tech Stack

- [Gatsby 5](https://www.gatsbyjs.com/)
- [React 18](https://react.dev/)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- CSS Modules

## Project Structure

```
src/
├── components/
│   ├── auth/          # Login, signup, route protection
│   ├── layout/        # Site layout and header
│   └── notes/         # Note CRUD and sharing
├── context/           # React context (auth)
├── images/            # PWA icon and static assets
├── lib/               # Firebase initialization
└── pages/             # Gatsby file-based routes
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Firebase project with Authentication and Firestore enabled

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kehinde-am/note-app-pwa.git
   cd note-app-pwa
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and add your Firebase credentials:

   ```bash
   cp .env.example .env.development
   ```

   Fill in the values from your Firebase project settings.

4. Start the development server:

   ```bash
   npm run develop
   ```

   Open [http://localhost:8000](http://localhost:8000).

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run develop` | Start development server       |
| `npm run build`   | Build for production           |
| `npm run serve`   | Serve production build locally |
| `npm run clean`   | Clear Gatsby cache             |
| `npm run format`  | Format code with Prettier      |
| `npm run lint`    | Run ESLint                     |

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password, Google, Facebook as needed).
3. Create a **Firestore** database.
4. Add a composite index for the notes query:
   - Collection: `notes`
   - Fields: `userId` (Ascending), `createdAt` (Descending)
5. Copy your web app config into `.env.development`.

## Deployment

Build the site:

```bash
npm run build
```

Deploy the `public/` folder to any static host (Netlify, Vercel, Firebase Hosting, etc.).

## License

0BSD
