import type { ProductVariant } from "../types";

export const mockVariants: Record<number, ProductVariant[]> = {
  1: [
    {
      color: { name: "Forest Green", hex: "#2D5016" },
      sizes: [{ label: "One Size", stock: 15 }],
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&q=80&w=800",
      ],
      originalPrice: 129.95,
    },
    {
      color: { name: "Charcoal", hex: "#333333" },
      sizes: [
        { label: "One Size", stock: 2 },
      ],
      images: [
        "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1497215848805-4f3876e530b1?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      color: { name: "Navy", hex: "#1C2E4A" },
      sizes: [
        { label: "One Size", stock: 0 },
      ],
      images: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"],
    },
  ],
  2: [
    {
      color: { name: "White/Black", hex: "#FFFFFF" },
      sizes: [
        { label: "S", stock: 5 },
        { label: "M", stock: 12 },
        { label: "L", stock: 0 },
        { label: "XL", stock: 2 },
      ],
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      color: { name: "Grey/Navy", hex: "#808080" },
      sizes: [
        { label: "S", stock: 8 },
        { label: "M", stock: 15 },
        { label: "L", stock: 5 },
        { label: "XL", stock: 0 },
      ],
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
      ],
    },
  ],
  3: [
    {
      color: { name: "Khaki", hex: "#C3B091" },
      sizes: [
        { label: "M", stock: 4 },
        { label: "L", stock: 2 },
        { label: "XL", stock: 10 },
      ],
      images: [
        "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
        "https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      color: { name: "Olive", hex: "#556B2F" },
      sizes: [
        { label: "M", stock: 0 },
        { label: "L", stock: 0 },
        { label: "XL", stock: 0 },
      ],
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
      ],
    },
  ],
};

export const mockSpecs = [
  {
    label: "Material",
    value: "G-1000 HeavyDuty Eco: 65% polyester, 35% cotton",
  },
  { label: "Height", value: "40 cm" },
  { label: "Width", value: "30 cm" },
  { label: "Depth", value: "15 cm" },
  { label: "Volume", value: "16 L" },
  { label: "Weight", value: "590 g" },
  { label: "Care Instructions", value: "Soft brush and lukewarm water" },
];
