# 🛍️ Stack & Stock — Vue 3 E-Commerce SPA

A fully data-driven, single-page e-commerce storefront built with **Vue 3 (Composition API)**, **TypeScript**, **Vite**, and **Tailwind CSS**, powered by the [DummyJSON](https://dummyjson.com) API.

Built for EC3404: GUI Programming — Mini Project (The Modern SPA).

---

## ✨ Features

### Core
- 🛒 **Product Catalog** — Browse products fetched live from `dummyjson.com/products`, with a responsive grid (1 / 2 / 3 columns across mobile, tablet, and desktop).
- 🔎 **Search & Filtering** — Full-text search, category filtering, price-range slider, and sort by name / price / rating.
- 📄 **Product Detail View** — Dedicated route per product (`/product/:id`) with image gallery, stock status, pricing, specs, and customer reviews.
- 💤 **Loading, Empty & Error States** — Skeleton loaders while fetching, friendly empty-search state, and retryable error state.

### Bonus (Distinction-level) Features
| Feature | Description |
|---|---|
| 🔐 **Authentication Simulation** | Sign in against `dummyjson.com/auth/login`, JWT stored in `localStorage`, reactive login/logout state gates checkout. |
| 🛍️ **Persistent Shopping Cart** | Global cart state via **Pinia**, synced to `localStorage` so it survives page reloads. Add / remove / update quantity, live totals. |
| 🧭 **Dynamic Routing** | **Vue Router** handles Home, Product Detail (`/product/:id`), Cart, and Login views, plus a wildcard redirect for unknown paths. |
| 🌙 **Dark Mode** | System-preference-aware theme toggle using Tailwind's `dark:` class strategy, persisted across sessions. |

---

## 🧰 Tech Stack

- **Vue 3** — Composition API with `<script setup>`
- **TypeScript** — strict typing across all API models, stores, and components (no `any`)
- **Vite 8** — build tooling & dev server
- **Tailwind CSS 3** — utility-first styling, custom brand palette & fonts
- **Pinia** — global state (cart, theme, auth)
- **Vue Router 4** — client-side routing
- **Axios** — HTTP client for the DummyJSON API

---

## 📂 Project Structure

```
src/
├── assets/              # Static assets (logos, images)
├── components/          # Reusable UI building blocks
│   ├── FilterBar.vue        # Search / category / sort / price filter panel
│   ├── NavBar.vue           # Top navigation, cart badge, auth state, theme toggle
│   └── ProductCard.vue      # Product grid tile with add-to-cart
├── composables/
│   └── useProducts.ts       # Product fetching, filtering & sorting logic
├── router/
│   └── index.ts             # Route definitions
├── services/
│   └── api.ts                # TypeScript interfaces for all DummyJSON responses
├── stores/
│   ├── auth.ts               # Pinia store: login/logout, token persistence
│   └── cart.ts                # Pinia store: cart items, totals, localStorage sync
├── utils/
│   └── theme.ts               # Pinia store: dark mode toggle & persistence
├── views/
│   ├── HomeView.vue           # Product listing + filters
│   ├── ProductView.vue        # Single product detail page
│   ├── CartView.vue           # Cart summary & checkout gate
│   └── LoginView.vue          # Auth simulation form
├── App.vue
└── main.ts
```

### Component Hierarchy

```
App.vue
└── NavBar.vue
└── RouterView
    ├── HomeView.vue
    │   ├── FilterBar.vue
    │   └── ProductCard.vue (× n)
    ├── ProductView.vue
    ├── CartView.vue
    └── LoginView.vue
```

State flows through two channels:
- **Local component state** (`ref`/`computed`) for page-specific UI (loading flags, form inputs, image selection).
- **Global Pinia stores** (`cart`, `auth`, `theme`) for state that must persist across routes and page reloads.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) `v20.19+` or `v22.12+`
- npm (comes with Node)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Lakpriya44/web-design.git
cd <your-repo>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173** (or the port shown in your terminal).

### Other Scripts

```bash
npm run build     # Type-check with vue-tsc, then build for production
npm run preview   # Preview the production build locally
```

### Demo Login Credentials

The auth flow uses DummyJSON's test accounts:

```
Username: emilys
Password: emilyspass
```

---

## 🔌 API Reference

This app consumes the following [DummyJSON](https://dummyjson.com/docs) endpoints:

| Endpoint | Purpose |
|---|---|
| `GET /products` | Product listing |
| `GET /products/search?q=` | Text search |
| `GET /products/category/:slug` | Category filtering |
| `GET /products/categories` | Category list for the filter dropdown |
| `GET /products/:id` | Single product detail |
| `POST /auth/login` | Authentication simulation |

---

## 📱 Responsive Design

Layouts adapt across breakpoints using Tailwind's `sm:` / `lg:` / `xl:` modifiers:
- **Mobile** — single-column product grid, collapsible nav menu, stacked cart layout.
- **Tablet** — two-column product grid.
- **Desktop** — three-column product grid, sidebar filters, side-by-side cart/summary.

---

## 🤖 GenAI Usage

AI assistance was used throughout development for accelerating TypeScript interface generation, Tailwind styling, and debugging.
---

## 📄 License

Built for educational purposes as part of EC3404: GUI Programming. Product data courtesy of [DummyJSON](https://dummyjson.com) — demo data only, not a real store.