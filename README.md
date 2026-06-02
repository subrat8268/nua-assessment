# Summit Gear Co. - Product Detail Page

A production-quality Product Detail Page (PDP) built for a premium outdoor gear store. Created as a Frontend Developer Assignment.

## Features

- **Dynamic Image Gallery**: Primary image zoom on hover (desktop), horizontal scrolling with dot indicators (mobile), and thumbnail selection.
- **Product Variants**: Selectable colors and sizes, fully synced with the URL query parameters (`?color=...&size=...`).
- **Inventory Awareness**: Handles available, low stock ("Only 2 left"), and sold-out states dynamically.
- **Cart Management**: Add to cart with simulated network latency and error handling. Slide-out cart drawer with quantity adjustments.
- **Persistence**: Cart state is persisted to `localStorage` and rehydrated on reload.
- **Responsive Design**: Custom CSS Grid/Flexbox layout that smoothly transitions from a two-column desktop view to a stacked mobile view.
- **Responsive Details**: Product specifications use Tabs on desktop and an Accordion on mobile for optimal UX.

## Tech Stack

- React 18
- TypeScript
- Vite
- SCSS Modules
- React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

- `src/components/` - Reusable UI components (Gallery, ColorSwatch, CartDrawer, etc.)
- `src/hooks/` - Custom React hooks (`useProduct`, `useLocalStorage`, `useURLState`)
- `src/stores/` - React Context and reducers (`CartContext`)
- `src/styles/` - Global SCSS variables, mixins, and resets
- `src/data/` - Mock data used to augment the Fake Store API (variants, stock, reviews)
