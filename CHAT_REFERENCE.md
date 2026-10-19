# Brian Jamison Real Estate — Project & Chat Reference Manual
> **Last Updated:** October 2026  
> **Environment:** VS Code + Antigravity Agent  
> **Repository:** `github.com/ali-technologies-pvt/brian-jamison` (Branch: `main`)

---

## 📌 1. Project Overview & Architecture

A full-stack, enterprise-grade luxury real estate platform and content management system custom-built for **Brian Jamison** (Jamison Real Estate, Top 2% Producer in Oklahoma City).

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Serverless-ready `/tmp` + in-memory cache fallbacks
- **Deployment Target:** Vercel (Frontend SPA + Serverless Express API)

```text
brian-jamison/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboardWorkspace.tsx  # Central Admin Hub (Forms, Blogs, Users, SEO)
│   │   │   │   └── AdminLoginView.tsx           # Secure login portal (auto-fill disabled)
│   │   │   ├── navigation/                      # Mega menus, Navbar, Concierge Docks
│   │   │   ├── Modals.tsx                       # ValuationModal, ConsultationModal, PropertyModal
│   │   │   ├── ValuationBanner.tsx              # CMA Valuation banner & address capture
│   │   │   ├── HeroVideo.tsx                    # Luxury 4K Hero video with escrow ticker
│   │   │   └── AdminToolbar.tsx                 # Floating In-line CMS toolbar
│   │   ├── context/
│   │   │   └── AdminContext.tsx                 # In-line CMS edit mode, media modal, save engine
│   │   ├── data/
│   │   │   └── realEstateData.ts                # Neighborhoods, market stats, MLS data
│   │   ├── pages/                               # Home, NeighborhoodDetailView, Buyers, Sellers, etc.
│   │   ├── utils/
│   │   │   └── formSubmissions.ts               # Dual-sync lead capture (localStorage + API + events)
│   │   ├── App.tsx                              # SPA Router & global layouts
│   │   └── main.tsx                             # Entrypoint
│   └── vite.config.ts                           # Vite server & /api proxy to port 5000
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts               # Super admin & role-based authentication
│   │   │   ├── forms.controller.ts              # Leads/inquiries API with /tmp + in-memory cache
│   │   │   ├── blogs.controller.ts              # WordPress-like blog posts API
│   │   │   ├── users.controller.ts              # Admin user management & roles API
│   │   │   └── content.controller.ts            # In-line CMS site copy & media updates
│   │   ├── models/                              # Mongoose schemas (FormSubmission, BlogPost, User, SiteContent)
│   │   ├── routes/                              # Express routers (/api/forms, /api/blogs, /api/users, etc.)
│   │   ├── lib/mongodb.ts                       # Resilient MongoDB connector
│   │   └── server.ts                            # Express app listener
│   └── data/                                    # Local JSON fallbacks
│
├── api/                                         # Vercel serverless functions entry
├── vercel.json                                  # Vercel route rewrites & build configuration
└── package.json                                 # Root workspace orchestration
```

---

## 🔑 2. Admin Credentials & Access

- **Admin Login URL:** `http://localhost:3000/admin` (or click **CMS Login** in the website footer/menu)
- **Super Admin Username:** `Admin`
- **Super Admin Password:** `#Imthepassword@123#`
- **Security Protections:**
  - Auto-fill removed from inputs (`autoComplete="new-password"`, `autoComplete="off"`).
  - JWT tokens stored securely with expiration.

---

## 🛠️ 3. Core Features Implemented in this Project

### A. In-Line Visual CMS
1. **Single-Letter & Full DOM Text Editing:**
   - Any text, heading, label, number, or button across the website can be edited in real-time when **Edit Mode** is active from the bottom toolbar.
2. **Text Selection Popup Toolbar:**
   - Selecting any portion of text renders an in-place floating editor:
     - **Internal Linking:** Add links (e.g., `/neighborhoods/nichols-hills`, `/sellers`).
     - **Color Customization:** Change text colors, highlights, or accents.
3. **Media & Image SEO Editor:**
   - Clicking on images or video containers opens the Media Modal:
     - Change Image/Video URL.
     - Custom **Alt Text** for accessibility and image search rankings.
     - **Meta Title** and **Meta Description** for on-page SEO.
     - Background color, overlay opacity, and card styles.

### B. WordPress-Style Admin Dashboard (`/admin`)
Divided into 4 dedicated workspaces:
1. **Form Submissions Hub (`activeTab === 'submissions'`):**
   - **Real-Time Dual Sync:** Every lead from `ValuationModal` or `ConsultationModal` instantly writes to `localStorage['jamison_form_submissions']`, fires a window event, and POSTs to `/api/forms/submit`.
   - **Auto-Polling:** Dashboard auto-refreshes every 5 seconds + updates instantly on window focus and storage events (no page reload needed).
   - **Dynamic Filter Bar:** Filter by Service and Service Area (automatically populates dynamically from incoming leads so no custom consultation topic is hidden).
   - **Search & Sort:** Live search across client name, email, phone, property address, and notes. Chronological sorting (Newest first / Oldest first).
   - **Unread Badges:** Unread count indicators, 1-click toggle to Mark as Read/Unread (`PATCH /api/forms/:id`), and submission deletion (`DELETE /api/forms/:id`).
   - **Detail Drawer:** Split layout showing contact info with direct `tel:` and `mailto:` links, property dimensions (sqft, beds, baths, pool, renovations), and estimated 3-tier valuation targets.
2. **WordPress-Style Blog Engine (`activeTab === 'blogs'`):**
   - Add new blog posts with WordPress fields: Title, Slug, Excerpt, Rich Content, Featured Image, Category, Tags, Author, Status (Draft/Published), Meta Title, Meta Description, and Canonical URL.
   - Edit, delete, and list all published and drafted posts.
3. **User & Role Management (`activeTab === 'users'`):**
   - Create new team members with granular roles (`Administrator`, `Editor`, `Author`, `Contributor`).
   - Toggle Active/Inactive status.
4. **CMS Overview & Global SEO (`activeTab === 'settings'`):**
   - Global site meta tags, schema verification, and cache status.

### C. Standardized Hero Experience
- Across the Homepage, Neighborhood detail pages, and service pages, the hero section has been aligned with:
  - High-definition luxury video background with Mute/Play controls.
  - Real-time **24-Hour Verified Escrow ticker**.
  - Verified Producer badge with 44px Brian Jamison Concierge Avatar.
  - High-intent address calculation lead funnels.

### D. IDX Broker Integrations & Test Sandboxes
- **Showcase Widget #179291 Page:** [`frontend/src/pages/IdxWidgetTestPage.tsx`](frontend/src/pages/IdxWidgetTestPage.tsx) (Accessible at `/idx-widget`, `/idx-179291`, `/idx-showcase`).
  - Supports 3 view modes: *Luxury Theme Container*, *Isolated Safe Frame (Recommended for scripts)*, and *Raw DOM Mode*.
  - Technical inspector, copy snippet button, and live status indicators.
- **Quick Search Widget #15844 Page:** [`frontend/src/pages/IdxTestPage.tsx`](frontend/src/pages/IdxTestPage.tsx) (Accessible at `/idx-test` or `/idx`).
  - Dynamic form inspector for search fields, property types, and city filters.

---

## ⚡ 4. Vercel & Serverless Deployment Safeguards

1. **Read-Only Filesystem Handling:**
   - AWS Lambda / Vercel Serverless prohibits writes to the root app directory.
   - `backend/src/controllers/forms.controller.ts` dynamically switches to `/tmp/form-submissions.json` in serverless environments.
2. **Persistent In-Memory Cache:**
   - Global variables (`global.__jamison_submissions_cache`, etc.) retain state across warm serverless function invocations.
3. **Build Script Fixes:**
   - Both backend (`tsc`) and frontend (`vite build`) compile with **0 errors**.

---

## 💻 5. Everyday Terminal Commands

| Task | Command |
|---|---|
| **Run Both Frontend & Backend** | `npm run dev` |
| **Run Frontend Only (Port 3000)** | `npm run dev:frontend` |
| **Run Backend Only (Port 5000)** | `npm run dev:backend` |
| **Build Frontend** | `npm --prefix frontend run build` |
| **Build Backend** | `npm --prefix backend run build` |
| **Deploy / Push to GitHub** | `git add . && git commit -m "update" && git push origin main` |

---

## 🧭 6. How to Continue Pair Programming in VS Code with Antigravity

When opening this project in VS Code with the Antigravity extension:
1. **Reference this file:** Tell Antigravity: `"See CHAT_REFERENCE.md for context"`.
2. **Key files to inspect when making changes:**
   - Forms & Leads: [`frontend/src/utils/formSubmissions.ts`](frontend/src/utils/formSubmissions.ts) and [`frontend/src/components/admin/AdminDashboardWorkspace.tsx`](frontend/src/components/admin/AdminDashboardWorkspace.tsx)
   - Lead Capture Modals: [`frontend/src/components/Modals.tsx`](frontend/src/components/Modals.tsx)
   - In-Line CMS: [`frontend/src/context/AdminContext.tsx`](frontend/src/context/AdminContext.tsx) and [`frontend/src/components/AdminToolbar.tsx`](frontend/src/components/AdminToolbar.tsx)
   - Backend APIs: [`backend/src/controllers/forms.controller.ts`](backend/src/controllers/forms.controller.ts)
3. **Keep dev server active:** Run `npm run dev` in the terminal for instant Hot Module Replacement (HMR).
