# Velora - Premium Footwear E-Commerce

A premium shoe e-commerce site built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Onboarding** – 4-slide welcome flow
- **Authentication** – Login with demo account
- **Home** – Search, brand filters, category tabs, popular products
- **Product listing** – Browse all shoes with filters
- **Product detail** – Size selection, add to cart
- **Shopping cart** – Quantity controls, checkout summary
- **Orders** – Order history with status tracking
- **Wallet** – Balance and transaction history
- **Profile** – User info and settings

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Material UI (MUI) v6
- Tailwind CSS v3
- Zustand (state management)

## Getting Started

### Prerequisites

- Node.js 18.17 or higher (recommended)

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Login

- **Email:** `saeed.abdilar@gmail.com`
- **Password:** any non-empty password

## Project Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # Reusable UI components
├── data/             # Mock product data
├── store/            # Zustand global state
├── theme/            # MUI theme configuration
└── types/            # TypeScript interfaces
```

## Scripts

| Command       | Description          |
|---------------|----------------------|
| `npm run dev` | Start dev server     |
| `npm run build` | Production build   |
| `npm start`   | Start production     |
| `npm run lint` | Run ESLint          |
