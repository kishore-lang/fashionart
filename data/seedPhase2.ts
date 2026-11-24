export interface GallerySeedItem {
  id: string;
  imageUrl: string;
  category:
    | "Fashion Show"
    | "Students Works"
    | "Photo Shoot"
    | "Convocation"
    | "Couture Gowns"
    | "Student Ateliers"
    | "Bridal Blouses"
    | "Aari Embroidery"
    | "Terracotta"
    | "Student Fests";
  caption?: string;
  postUrl?: string;
  instagramHandle?: string;
  authorName?: string;
  isInstagramPost?: boolean;
}

export interface AchievementSeedItem {
  id: string;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

export interface TestimonialSeedItem {
  id: string;
  name: string;
  role: string;
  location: string;
  course: string;
  text: string;
  rating: number;
  imageUrl: string;
  videoUrl?: string;
}

export const SEED_GALLERY: GallerySeedItem[] = [
  // 1. Fashion Show (Live Runway from fashionartonline.com/fashionshow)
  {
    id: "g-fashionshow-live-1",
    imageUrl: "/images/gallery/fashionshow-1.webp",
    category: "Fashion Show",
    caption: "Fashion Show Runway Collection",
  },
  {
    id: "g-fashionshow-live-2",
    imageUrl: "/images/gallery/fashionshow-2.webp",
    category: "Fashion Show",
    caption: "Fashion Show Runway Collection",
  },
  {
    id: "g-fashionshow-live-3",
    imageUrl: "/images/gallery/fashionshow-3.webp",
    category: "Fashion Show",
    caption: "Fashion Show Runway Collection",
  },
  {
    id: "g-fashion-show-1",
    imageUrl: "/images/gallery/fashion-show-1.webp",
    category: "Fashion Show",
    caption: "Fashion Show Event",
  },
  {
    id: "g-fashion-show-2",
    imageUrl: "/images/gallery/fashion-show-2.webp",
    category: "Fashion Show",
    caption: "Fashion Show Event",
  },
  {
    id: "g-fashion-show-3",
    imageUrl: "/images/gallery/fashion-show-3.webp",
    category: "Fashion Show",
    caption: "Fashion Show Event",
  },

  // 2. Students Works (from fashionartonline.com/studentsworks)
  {
    id: "g-student-work-1",
    imageUrl: "/images/gallery/studentwork-1.webp",
    category: "Students Works",
    caption: "Students Work Collection",
  },
  {
    id: "g-student-work-2",
    imageUrl: "/images/gallery/studentwork-2.webp",
    category: "Students Works",
    caption: "Students Work Collection",
  },
  {
    id: "g-student-work-3",
    imageUrl: "/images/gallery/studentwork-3.webp",
    category: "Students Works",
    caption: "Students Work Collection",
  },

  // 3. Photo Shoot (from fashionartonline.com/photoshoot)
  {
    id: "g-photoshoot-1",
    imageUrl: "/images/gallery/photoshoot-1.webp",
    category: "Photo Shoot",
    caption: "Editorial Photo Shoot",
  },
  {
    id: "g-photoshoot-2",
    imageUrl: "/images/gallery/photoshoot-2.webp",
    category: "Photo Shoot",
    caption: "Editorial Photo Shoot",
  },
  {
    id: "g-photoshoot-3",
    imageUrl: "/images/gallery/photoshoot-3.webp",
    category: "Photo Shoot",
    caption: "Editorial Photo Shoot",
  },

  // 4. Convocation Photos (Annual Graduation Ceremony)
  {
    id: "g-convocation-1",
    imageUrl: "/images/gallery/convocation-1.webp",
    category: "Convocation",
    caption: "Annual Convocation Ceremony",
  },
  {
    id: "g-convocation-2",
    imageUrl: "/images/gallery/convocation-2.webp",
    category: "Convocation",
    caption: "Annual Convocation Ceremony",
  },
  {
    id: "g-convocation-3",
    imageUrl: "/images/gallery/convocation-3.webp",
    category: "Convocation",
    caption: "Annual Convocation Ceremony",
  },

  // 5. Haute Couture & Atelier Highlights
  {
    id: "g-piano-couture",
    imageUrl: "/images/gallery/piano-couture-gown.webp",
    category: "Couture Gowns",
    caption: "Couture Design",
  },
  {
    id: "g-post-renu",
    imageUrl: "/images/gallery/piano-couture-gown.webp",
    category: "Student Ateliers",
    caption: "Student Atelier Showcase",
    postUrl: "https://www.instagram.com/renu_fashion_magic/p/De_hMreyWzk/",
    instagramHandle: "@renu_fashion_magic",
    authorName: "Renu Fashion Magic",
    isInstagramPost: true,
  },
  {
    id: "g-post-aathi",
    imageUrl: "/images/gallery/studentwork-1.webp",
    category: "Student Ateliers",
    caption: "Student Atelier Showcase",
    postUrl: "https://www.instagram.com/aathi_nathi_vibes/p/De_JAW9EYNp/",
    instagramHandle: "@aathi_nathi_vibes",
    authorName: "Aathi Nathi Vibes",
    isInstagramPost: true,
  },
  {
    id: "g-post-dhiyash",
    imageUrl: "/images/gallery/fashionshow-2.webp",
    category: "Student Ateliers",
    caption: "Student Atelier Showcase",
    postUrl: "https://www.instagram.com/dhiyash_designs/p/De9v7DEGFen/",
    instagramHandle: "@dhiyash_designs",
    authorName: "Dhiyash Designs",
    isInstagramPost: true,
  },
  {
    id: "g-post-clar",
    imageUrl: "/images/gallery/photoshoot-1.webp",
    category: "Student Ateliers",
    caption: "Student Atelier Showcase",
    postUrl: "https://www.instagram.com/_justclar_/p/De8xqU3k_E1/",
    instagramHandle: "@_justclar_",
    authorName: "Just Clar",
    isInstagramPost: true,
  },
];

export const SEED_ACHIEVEMENTS: AchievementSeedItem[] = [
  {
    id: "a1",
    title: "Universal Record Forum (URF) World Record",
    year: "2022",
    badge: "Official World Record",
    description:
      "50 dedicated women student designers from Fashion Art Institute stitched 300 custom tailored garments in 3 continuous hours without any machine failure or fitting defects.",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "a2",
    title: "Best Creative Designer of Tamil Nadu",
    year: "2017",
    badge: "State Honour",
    description:
      "Founder Suguna Shanmugam received the State Honour for innovative pattern cutting formulas and pioneering accessible fashion education for female homemakers.",
    imageUrl: "/images/founder_saree.png",
  },
  {
    id: "a3",
    title: "Central Government Vocational Training Accreditation",
    year: "2018",
    badge: "National Certification",
    description:
      "Institute received official authorisation to deliver Central Government certified tailoring, embroidery, and fashion designing certificates across Tamil Nadu.",
    imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "a4",
    title: "Women Entrepreneurship Excellence Award",
    year: "2021",
    badge: "Community Leadership",
    description:
      "Recognized at the Coimbatore District Industry Forum for guiding over 800+ homemakers into starting their own boutique enterprises during 2020-2021.",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "a5",
    title: "Excellence in Vocational Fashion Mentorship",
    year: "2024",
    badge: "Education Award",
    description:
      "Honored for achieving 100% placement guidance and establishing a global online student network across 6 countries.",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  },
];

export const SEED_TESTIMONIALS: TestimonialSeedItem[] = [
  {
    id: "t1",
    name: "Kavitha Rajendran",
    role: "Founder, Kavitha Designer Couture",
    location: "RS Puram, Coimbatore",
    course: "Self Designing Course & Blouse Masterclass",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    text: "Before joining Fashion Art Institute, I had zero stitching experience and was hesitant whether I could learn. Suguna Ma'am's measurement formulas are pure magic! Now I run a busy boutique in RS Puram earning ₹45,000+ per month.",
  },
  {
    id: "t2",
    name: "Deepa Nandakumar",
    role: "Bridal Zardozi Specialist",
    location: "Gandhipuram, Coimbatore",
    course: "Advanced Aari Embroidery (79 Stitches)",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    text: "The 79 stitches covered in this course are completely unmatched in Coimbatore. The 3D organza cutwork, zardozi couching, and bead framing helped me get high-ticket bridal blouse orders right from month two.",
  },
  {
    id: "t3",
    name: "Ananya Senthil",
    role: "Fashion Designing Diploma Graduate",
    location: "Tirupur, Tamil Nadu",
    course: "Professional Diploma in Fashion Designing",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    text: "The classroom environment in Gandhipuram is very supportive. From croquis illustration to pattern grading, the trainers explain every concept until you are completely confident. The Central Govt certificate gave me instant credibility.",
  },
  {
    id: "t4",
    name: "Priyanka Murugan",
    role: "Online Student & Freelancer",
    location: "Chennai (Online Batch)",
    course: "Designer Patterns (Advanced Designing)",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    text: "I attended online from Chennai. The video quality, step-by-step PDF notes, and instant WhatsApp feedback for my stitched garments made me feel like I was learning in person. Circular gowns and Anarkalis are now my specialty!",
  },
  {
    id: "t5",
    name: "Sowmya Krishnan",
    role: "Terracotta Jewellery Artisan",
    location: "Pollachi",
    course: "Terracotta Jewellery Making",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    text: "Learning how to hollow out jhumkas so they remain lightweight was a game changer. My clients love the antique metallic glaze! I sell my designs on Instagram and at craft exhibitions across Tamil Nadu.",
  },
];
