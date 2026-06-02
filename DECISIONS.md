# DECISIONS.md

## The decision I went back and forth on: Tabs vs Accordion

For the product details section I initially went with an accordion because it felt more natural on mobile — you don't have to scroll back up to switch panels. But then I reconsidered. The three panels (Description, Specifications, Reviews) are distinct enough that a user is unlikely to want to compare them side by side, and on desktop an accordion feels a bit clunky with all that horizontal space available.

I landed on **tabs**. The main reason was that tabs make the three sections feel like equal, parallel options rather than a collapsible list. It also made the responsive behaviour simpler — tabs stack fine on mobile without needing extra logic. If the panels had nested content or needed to be open simultaneously, accordion would have been the right call.

## Open Questions I Had to Call

**1. Zoom on hover (desktop)**
The spec said "image should support zoom on hover — but read the open questions section first." I implemented a CSS `transform: scale` zoom on the primary image container rather than a lens/magnifier overlay. A proper magnifier felt over-engineered for this scope and would have needed an additional library or a lot of custom pointer tracking logic. Scale zoom is clean, accessible, and works without JS.

**2. Delivery estimate — when to show it**
The spec says "conditionally shown" but doesn't define the condition. I decided to show it only when a valid size is selected and the variant is in stock. Showing a delivery estimate for a sold-out variant felt misleading. The estimate itself is static ("Delivered in 3–5 business days") since there's no real shipping API.

**3. Fake Store API has no variants**
The API gives one image and no colour/size/stock data. I built a `mockVariants.ts` file that maps product IDs to variant config. It grew longer than I'd like — around 150 lines — but keeping it separate from the API layer means it's easy to swap out if a real variants endpoint existed.

## What I'd clean up with more time

- `mockVariants.ts` is doing too much. I'd split it into separate files per concern — one for colours, one for sizes, one for gallery images.
- The quantity picker and the add-to-cart button share some disabled state logic that's slightly duplicated across the component and the reducer. I'd consolidate that into a single derived value.
- I didn't get to write tests. I would have started with the variant selector — specifically the sold-out disable logic and the quantity cap — since those have the most edge cases.
- Lighthouse flagged image sizing. The Fake Store API returns images without explicit dimensions, which causes layout shift. I'd wrap them with fixed aspect-ratio containers from the start next time.
