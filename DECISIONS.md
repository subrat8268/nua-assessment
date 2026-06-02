# Design Decisions

## Architectural Decision: State Management with React Context + useReducer

**Decision**: Instead of pulling in a third-party state management library like Redux Toolkit or Zustand, I opted to use React's built-in Context API combined with `useReducer`.

**Rationale**:
1. **Scope and Complexity**: For an application of this scale (a single Product Detail Page and a Cart Drawer), Redux is overly complex and introduces unnecessary boilerplate.
2. **Predictable State Transitions**: Using `useReducer` gives us a predictable, action-driven state transition model (like Redux), which handles the logic for adding items, updating quantities, and removing items elegantly in one central place.
3. **localStorage Persistence**: The `useReducer` pattern makes it trivial to intercept state changes and serialize them to `localStorage`, fulfilling the persistence requirement without middleware complexities.

## Missing Functionality in Fake Store API
The Fake Store API provides a single image per product and no concept of variants (colors, sizes) or inventory. 
To fulfill the requirements of the assignment, I created a mock data layer (`src/data/mockVariants.ts`) that intercepts the loaded product ID and augments the API response with:
- Color variants (with specific hex codes)
- Size variants (with specific stock levels, including low stock and sold out states)
- Additional gallery images for the thumbnails

## Improvements with More Time

1. **Performance & Lazy Loading**: Add image lazy loading (e.g., blur-up placeholders or `react-lazy-load-image-component`) for the gallery images to improve initial load time and LCP (Largest Contentful Paint).
2. **Optimistic UI Updates**: If there was a real backend for the cart, I would implement optimistic UI updates for adding/removing items to make the interface feel instantly responsive while the API request processes in the background.
3. **Accessibility (a11y)**: While I included basic ARIA roles (`role="radiogroup"`, `aria-selected`, etc.) and focus states, a full audit using `axe-core` and improved keyboard navigation (especially inside the cart drawer) would be necessary for a production app.
4. **End-to-End Testing**: I would add Playwright or Cypress tests to cover the complete user flow: viewing the product, selecting a variant, adding to cart, and interacting with the drawer.
5. **Real Inventory Sync**: The current stock logic is client-side only. A real implementation would require polling or WebSocket connections to ensure stock levels haven't changed while the user is viewing the page.
