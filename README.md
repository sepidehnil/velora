# Velora — Premium Footwear E-Commerce

A premium shoe storefront built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Landing page** — Hero, featured products, categories, showcase, testimonials, newsletter
- **Product catalog** — Browse, search, and filter by brand and category
- **Product detail** — Size selection, add to cart, related products
- **Shopping cart** — Quantity controls and order summary
- **Checkout** — Shipping and payment form (demo)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS v3
- Framer Motion
- Zustand (state management)

## Getting Started

### Prerequisites

- Node.js 18.17 or higher

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # UI and layout components
├── data/             # Mock product data
├── store/            # Zustand global state
├── lib/              # Utilities and animations
└── types/            # TypeScript interfaces
```

## Scripts

| Command         | Description        |
|-----------------|--------------------|
| `npm run dev`   | Start dev server   |
| `npm run build` | Production build   |
| `npm start`     | Start production   |
| `npm run lint`  | Run ESLint         |

## Live Site

[https://velora.vercel.app](https://velora.vercel.app)
