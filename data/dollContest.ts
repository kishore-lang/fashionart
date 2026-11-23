export interface DollItem {
  id: number;
  number: number;
  title: string;
  category: string;
  imageUrl: string;
  votesCount: number;
}

export interface DollVoteSubmission {
  id: string;
  dollNumber: number;
  voterName: string;
  voterEmail: string;
  voterPhone: string;
  instagramId: string;
  screenshotUrl?: string;
  comment?: string;
  submittedAt: string;
}

// Generate 100 Dolls with real institute photo seeds and numbers
const DEFAULT_DOLL_IMAGES = [
  "/images/gallery/piano-couture-gown.webp",
  "/images/founder_saree.png",
  "/images/courses/advanced-aari.jpg",
  "/images/courses/designer-patterns.jpg",
  "/images/courses/diploma-fashion.jpg",
  "/images/courses/terracotta-jewellery.jpg",
  "/images/courses/hand-embroidery.jpg",
  "/images/courses/master-tailoring.jpg",
  "/images/courses/self-designing.jpg",
  "/images/courses/men-garments.jpg",
];

export const INITIAL_DOLLS: DollItem[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const imageIndex = (num - 1) % DEFAULT_DOLL_IMAGES.length;
  return {
    id: num,
    number: num,
    title: `Handcrafted Bridal Doll #${num}`,
    category: num % 2 === 0 ? "Royal Silk Doll" : "Aari Designer Doll",
    imageUrl: DEFAULT_DOLL_IMAGES[imageIndex],
    votesCount: Math.floor(Math.abs(Math.sin(num * 99)) * 45) + 5,
  };
});
