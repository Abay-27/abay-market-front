import { Product, Category, User, Order } from "./types";

export const categories: Category[] = [
  { 
    id: "1", 
    name: "Agriculture", 
    icon: "Sprout", 
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/agri-products-890ac0d0-1775227856636.webp" 
  },
  { 
    id: "2", 
    name: "Coffee", 
    icon: "Coffee", 
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/coffee-product-38430eb2-1775227855424.webp" 
  },
  { 
    id: "3", 
    name: "Traditional Wear", 
    icon: "Shirt", 
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/traditional-textile-d1e1b718-1775227855193.webp" 
  },
  { 
    id: "4", 
    name: "Electronics", 
    icon: "Smartphone", 
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/electronics-category-befb21f9-1775227855770.webp" 
  },
  { 
    id: "5", 
    name: "Home & Office", 
    icon: "Armchair", 
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80" 
  },
  { 
    id: "6", 
    name: "Logistics", 
    icon: "Truck", 
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80" 
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Sidama Coffee Beans (5kg)",
    price: 3450,
    description: "Premium organic Sidama coffee beans, medium roast. Directly sourced from Ethiopian farmers.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/coffee-product-38430eb2-1775227855424.webp",
    category: "Coffee",
    rating: 4.8,
    reviews: 124,
    isTrending: true,
  },
  {
    id: "p2",
    name: "Traditional Men's Habesha Wear",
    price: 4500,
    description: "High-quality traditional Ethiopian men's attire made from pure cotton with exquisite hand embroidery.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/traditional-textile-d1e1b718-1775227855193.webp",
    category: "Traditional Wear",
    rating: 4.9,
    reviews: 89,
    isTrending: true,
  },
  {
    id: "p3",
    name: "Bulk Teff (50kg Bag)",
    price: 12000,
    description: "High-grade white teff for wholesale. Cleaned and ready for export or domestic use.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/agri-products-890ac0d0-1775227856636.webp",
    category: "Agriculture",
    rating: 4.7,
    reviews: 210,
  },
  {
    id: "p4",
    name: "Solar Power Station 500W",
    price: 45000,
    description: "Portable solar power station for off-grid power solutions. Perfect for rural business setups.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ab33d0-e4e5-4096-8bde-f03a9ebd1a2d/electronics-category-befb21f9-1775227855770.webp",
    category: "Electronics",
    rating: 4.5,
    reviews: 56,
  },
  {
    id: "p5",
    name: "Handwoven Ethiopian Rug",
    price: 8500,
    description: "Beautiful handwoven rug with traditional patterns. Durable and culturally rich.",
    image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80",
    category: "Home & Office",
    rating: 4.6,
    reviews: 34,
  },
  {
    id: "p6",
    name: "Yirgacheffe Green Coffee",
    price: 2900,
    description: "Unroasted Yirgacheffe green coffee beans for professional roasters.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80",
    category: "Coffee",
    rating: 4.9,
    reviews: 45,
  }
];

export const mockUsers: User[] = [
  { 
    id: 'u1', 
    name: 'Admin User', 
    email: 'admin@workabay.com', 
    role: 'Super Admin', 
    joined: 'Jan 01, 2024', 
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  { 
    id: 'u2', 
    name: 'Abebe Bikila', 
    email: 'abebe@example.com', 
    role: 'Customer', 
    joined: 'Feb 15, 2024', 
    status: 'Active',
    phone: '+251 911 223344'
  },
  { 
    id: 'u3', 
    name: 'Aster Aweke', 
    email: 'aster@example.com', 
    role: 'Customer', 
    joined: 'Mar 10, 2024', 
    status: 'Inactive',
    phone: '+251 922 334455'
  },
  { 
    id: 'u4', 
    name: 'Tewodros Kassahun', 
    email: 'teddy@music.et', 
    role: 'Merchant', 
    joined: 'Mar 12, 2024', 
    status: 'Active',
    phone: '+251 933 445566'
  },
  { 
    id: 'u5', 
    name: 'Ephrem Tadesse', 
    email: 'ephrem@example.com', 
    role: 'Merchant', 
    joined: 'Apr 05, 2024', 
    status: 'Suspended' 
  },
  { 
    id: 'u6', 
    name: 'Selam Gebre', 
    email: 'selam@example.com', 
    role: 'Customer', 
    joined: 'Apr 12, 2024', 
    status: 'Active' 
  },
  { 
    id: 'u7', 
    name: 'Dawit Yohannes', 
    email: 'dawit@workabay.com', 
    role: 'Admin', 
    joined: 'May 01, 2024', 
    status: 'Active' 
  },
];

export const mockOrders: Order[] = [];