export interface Cabin {
  id: string;
  name: string;
  location: string;
  region: string;
  price: number;
  capacity: number;
  description: string;
  shortDescription: string;
  amenities: string[];
  images: string[];
  rating: number;
  reviews: number;
}

export const cabins: Cabin[] = [
  {
    id: "treehouse-ubud",
    name: "The Treehouse",
    location: "Ubud, Bali",
    region: "Bali",
    price: 185,
    capacity: 2,
    description: "Perched among ancient banyan trees, this architectural marvel blends seamlessly into the tropical canopy. Floor-to-ceiling windows frame views of terraced rice paddies below, while the open-air bathroom lets you shower under the stars. Wake up to birdsong and the gentle rustle of leaves.",
    shortDescription: "A treetop retreat surrounded by rice paddies and tropical canopy.",
    amenities: ["WiFi", "Air Conditioning", "Private Pool", "Kitchen", "Rain Shower", "Yoga Deck"],
    images: ["/placeholder.svg"],
    rating: 4.9,
    reviews: 127,
  },
  {
    id: "cliff-cabin-uluwatu",
    name: "Cliff Cabin",
    location: "Uluwatu, Bali",
    region: "Bali",
    price: 245,
    capacity: 2,
    description: "Dramatically positioned on limestone cliffs above the Indian Ocean, this cabin offers uninterrupted sunset views. The minimalist interior focuses your attention on nature — raw concrete, warm teak, and panoramic glass. An infinity plunge pool seems to merge with the ocean horizon.",
    shortDescription: "Cliffside minimalism with infinity pool and ocean panoramas.",
    amenities: ["WiFi", "Infinity Pool", "Ocean View", "Kitchen", "BBQ", "Sunset Deck"],
    images: ["/placeholder.svg"],
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "jungle-pod-lombok",
    name: "Jungle Pod",
    location: "Senggigi, Lombok",
    region: "Lombok",
    price: 135,
    capacity: 2,
    description: "A geodesic pod nestled deep in Lombok's rainforest. Designed for digital detox — no TV, no distractions, just the symphony of tropical nature. Hike to hidden waterfalls, surf world-class waves, or simply hammock the day away.",
    shortDescription: "A geodesic hideaway deep in Lombok's untouched rainforest.",
    amenities: ["Solar Power", "Outdoor Shower", "Hammock", "Hiking Trails", "Surfboard Rental"],
    images: ["/placeholder.svg"],
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "rice-field-cabin-bandung",
    name: "Rice Field Cabin",
    location: "Lembang, Bandung",
    region: "Bandung",
    price: 110,
    capacity: 4,
    description: "Set among emerald rice terraces in the cool highlands of Bandung, this A-frame cabin is perfect for families and small groups. The wrap-around deck overlooks misty valleys, and the wood-burning fireplace makes cool mountain evenings unforgettable.",
    shortDescription: "Highland A-frame cabin overlooking misty rice terraces.",
    amenities: ["WiFi", "Fireplace", "Full Kitchen", "Mountain View", "BBQ", "Board Games"],
    images: ["/placeholder.svg"],
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "beach-hut-gili",
    name: "Beach Hut",
    location: "Gili Trawangan, Lombok",
    region: "Lombok",
    price: 165,
    capacity: 2,
    description: "Steps from turquoise waters, this elevated beach hut combines barefoot luxury with island simplicity. Snorkel with sea turtles, cycle the island, or watch the sun dip behind Mount Agung from your private terrace.",
    shortDescription: "Barefoot luxury steps from Gili's turquoise waters.",
    amenities: ["Beach Access", "Snorkel Gear", "Bicycle", "Outdoor Shower", "Terrace", "Breakfast"],
    images: ["/placeholder.svg"],
    rating: 4.6,
    reviews: 73,
  },
  {
    id: "volcano-lodge-yogyakarta",
    name: "Volcano Lodge",
    location: "Kaliurang, Yogyakarta",
    region: "Yogyakarta",
    price: 95,
    capacity: 3,
    description: "At the foot of Mount Merapi, this rustic-modern lodge offers dramatic volcanic landscapes and cool mountain air. Explore ancient temples, visit local villages, and return to a warm cabin with panoramic views of Java's most active volcano.",
    shortDescription: "Rustic-modern lodge at the foot of Mount Merapi.",
    amenities: ["WiFi", "Hot Water", "Mountain View", "Kitchen", "Garden", "Temple Tours"],
    images: ["/placeholder.svg"],
    rating: 4.8,
    reviews: 102,
  },
];

export const regions = ["All Locations", "Bali", "Lombok", "Bandung", "Yogyakarta"];
