export interface GallerySeedItem {
  id: string;
  imageUrl: string;
  category:
    | "Bridal Blouses"
    | "Couture Gowns"
    | "Aari Embroidery"
    | "Terracotta"
    | "Student Fests"
    | "Student Ateliers";
  caption: string;
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
  {
    id: "g-piano-couture",
    imageUrl: "/images/gallery/piano-couture-gown.webp",
    category: "Couture Gowns",
    caption:
      "Architectural monochrome piano-keys couture gown with asymmetrical pleated neckline and dramatic floor drape.",
  },
  {
    id: "g-post-renu",
    imageUrl: "/images/gallery/piano-couture-gown.webp",
    category: "Student Ateliers",
    caption:
      "Boutique showcase by student designer Renu — bespoke bridal wear drafted with Fashion Art Institute formulas.",
    postUrl: "https://www.instagram.com/renu_fashion_magic/p/De_hMreyWzk/",
    instagramHandle: "@renu_fashion_magic",
    authorName: "Renu Fashion Magic",
    isInstagramPost: true,
  },
  {
    id: "g-post-aathi",
    imageUrl: "/images/courses/advanced-aari.jpg",
    category: "Student Ateliers",
    caption:
      "Handcrafted heritage ensembles and bridal blouse styling by certified alumni atelier.",
    postUrl: "https://www.instagram.com/aathi_nathi_vibes/p/De_JAW9EYNp/",
    instagramHandle: "@aathi_nathi_vibes",
    authorName: "Aathi Nathi Vibes",
    isInstagramPost: true,
  },
  {
    id: "g-post-dhiyash",
    imageUrl: "/images/courses/designer-patterns.jpg",
    category: "Student Ateliers",
    caption:
      "Signature festive silhouettes and volume gown structures from Dhiyash Designs boutique studio.",
    postUrl: "https://www.instagram.com/dhiyash_designs/p/De9v7DEGFen/",
    instagramHandle: "@dhiyash_designs",
    authorName: "Dhiyash Designs",
    isInstagramPost: true,
  },
  {
    id: "g-post-clar",
    imageUrl: "/images/courses/diploma-fashion.jpg",
    category: "Student Ateliers",
    caption:
      "Avant-garde runway aesthetics, conceptual drape geometry, and editorial fashion portfolio.",
    postUrl: "https://www.instagram.com/_justclar_/p/De8xqU3k_E1/",
    instagramHandle: "@_justclar_",
    authorName: "Just Clar",
    isInstagramPost: true,
  },
  {
    id: "g1",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80",
    category: "Aari Embroidery",
    caption: "Heavy bridal silk blouse featuring intricate zardozi wire and 3D organza cutwork embroidery.",
  },
  {
    id: "g2",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    category: "Student Fests",
    caption: "Students drafting precision paper patterns during our annual practical workshop in Coimbatore.",
  },
  {
    id: "g3",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
    category: "Couture Gowns",
    caption: "Full 360-degree circular umbrella gown crafted from an upcycled heirloom Kanjivaram silk saree.",
  },
  {
    id: "g4",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    category: "Terracotta",
    caption: "Handcrafted terracotta jewellery set featuring antique gold finish and peacock pendant.",
  },
  {
    id: "g5",
    imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80",
    category: "Bridal Blouses",
    caption: "Deep-neck designer blouse with zero-wrinkle armhole drafting and padded princess cut silhouette.",
  },
  {
    id: "g6",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    category: "Couture Gowns",
    caption: "Contemporary Indo-western gown with cancan volume flare, created for Fashion Art Fest runway.",
  },
  {
    id: "g7",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    category: "Aari Embroidery",
    caption: "79-stitch sample hoop display showcasing fine bead work, chain variations, and French knots.",
  },
  {
    id: "g8",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    category: "Student Fests",
    caption: "Yaadhumaagi Nirpaval award ceremony recognizing female students who established home boutiques.",
  },
  {
    id: "g9",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    category: "Terracotta",
    caption: "Lightweight hand-rolled terracotta jhumkas with water-resistant acrylic enamel glazing.",
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
