import type { Review } from "../types";

export const mockReviews: Review[] = [
  {
    id: "r1",
    author: "Alex M.",
    rating: 5,
    date: "2023-10-15",
    title: "Perfect for daily commuting",
    body: 'I bought this backpack for my daily commute and it has been fantastic. It easily fits my 15" laptop, charger, and a light jacket. The G-1000 material feels incredibly durable. Highly recommend!',
    verified: true,
  },
  {
    id: "r2",
    author: "Sarah J.",
    rating: 4,
    date: "2023-09-02",
    title: "Great quality, slightly stiff at first",
    body: "The build quality is exactly what you expect from Fjallraven. It takes a few days to break in the fabric, but after that it is very comfortable. Wish it had one more internal pocket.",
    verified: true,
  },
  {
    id: "r3",
    author: "Michael T.",
    rating: 5,
    date: "2023-08-20",
    title: "Took it hiking, performed flawlessly",
    body: "Used this on a weekend trip. While it is styled for urban use, it held up perfectly on the trail. Water resistance is solid out of the box.",
    verified: false,
  },
];
