# Brian Jamison Real Estate — Modern Architecture

A full-stack luxury real estate platform and content management system for **Brian Jamison** (Jamison Real Estate, Top 2% Producer in Oklahoma City).

The project is cleanly separated into two distinct, well-organized applications:
- **`frontend/`**: Vite + React 19 + TypeScript + Tailwind CSS (v4)
- **`backend/`**: Express + TypeScript + MongoDB / Prisma ORM + JWT Auth

---

## 📁 Directory Structure

```text
brian-jamison/
├── frontend/                     # Modern React Single Page Application (SPA)
│   ├── public/                   # Static assets, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/           # UI Components (Navbar, HeroVideo, Modals, etc.)
│   │   │   ├── admin/            # Admin login & dashboard views
│   │   │   └── navigation/       # Mega menus & mobile navigation docks
│   │   ├── context/              # AdminContext & global state
│   │   ├── data/                 # Real estate market data, MLS info, blueprints
│   │   ├── pages/                # Interior pages, Community Hubs, Idx test, Sitemap
│   │   ├── App.tsx               # Main routing & layout engine
│   │   ├── main.tsx              # React DOM entrypoint
│   │   └── index.css             # Tailwind v4 theme & typography styling
│   ├── index.html                # HTML template with SEO schema metadata
│   ├── vite.config.ts            # Vite config with /api reverse proxy to port 5000
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Frontend scripts & dependencies
│   └── .env                      # Frontend environment config
│
├── backend/                      # Node.js + Express API Server
│   ├── src/
│   │   ├── config/               # Environment variable loader
│   │   ├── controllers/          # Request handlers (auth, site content)
│   │   ├── middleware/           # JWT auth & error handling middleware
│   │   ├── models/               # Mongoose schemas (SiteContent)
│   │   ├── routes/               # API route definitions (/auth, /content, /health)
│   │   ├── lib/                  # Database connections & JWT utilities
│   │   ├── app.ts                # Express app configuration & middleware
│   │   └── server.ts             # Server entrypoint (listening on port 5000)
│   ├── prisma/                   # Prisma schema & seed script
│   ├── data/                     # Local JSON cache fallback (site-content.json)
│   ├── nextjs-reference/         # Reference Next.js App Router archive
│   ├── tsconfig.json             # Backend TypeScript configuration
│   ├── package.json              # Backend scripts & dependencies
│   └── .env                      # Backend environment config
│
├── package.json                  # Root orchestration script
├── .gitignore                    # Git ignore rules
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start (Running the Project)

### 1. Run Both Frontend and Backend Concurrently
From the root directory:
```bash
npm run dev
```
This command starts:
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:3000`

### 2. Run Individually
- **Frontend only**:
  ```bash
  npm run dev:frontend
  # or: cd frontend && npm run dev
  ```
- **Backend only**:
  ```bash
  npm run dev:backend
  # or: cd backend && npm run dev
  ```

---

## 🔑 Admin Credentials
- **Username**: `Admin`
- **Password**: `#Imthepassword@123#`
- **Portal URL**: `http://localhost:3000/admin` (or click "CMS Login" on the website)

---

## 🔌 API Endpoints
- `GET  /api/health` — Health check & status
- `POST /api/auth/login` — Super Admin authentication
- `POST /api/auth/logout` — Revoke admin session
- `GET  /api/auth/me` — Verify active admin token
- `GET  /api/content` — Retrieve CMS copy & data (MongoDB with local fallback)
- `POST /api/content/update` — Save inline text & CMS content
