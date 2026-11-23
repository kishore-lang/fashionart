export interface GallerySeedItem {
  id: string;
  imageUrl: string;
  category:
    | "Bridal Blouses"
    | "Couture Gowns"
    | "Aari Embroidery"
    | "Terracotta"
    | "Student Fests"
    | "Student Ateliers"
    | "Convocation"
    | "Fashion Show";
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
  // 1. Convocation Photos (Real Institute Graduation Events)
  {
    id: "g-convocation-1",
    imageUrl: "/images/gallery/convocation-1.webp",
    category: "Convocation",
    caption:
      "Annual Convocation Ceremony — Central Government Certified fashion couturiers receiving formal diplomas on stage.",
  },
  {
    id: "g-convocation-2",
    imageUrl: "/images/gallery/convocation-2.webp",
    category: "Convocation",
    caption:
      "Graduation honours and student felicitations alongside founder Suguna Shanmugam in Coimbatore.",
  },
  {
    id: "g-convocation-3",
    imageUrl: "/images/gallery/convocation-3.webp",
    category: "Convocation",
    caption:
      "Proud student designers celebrating certification milestones and graduation moments with faculty.",
  },

  // 2. Fashion Show Runway Photos (Real Grand Runway Events)
  {
    id: "g-fashion-show-1",
    imageUrl: "/images/gallery/fashion-show-1.webp",
    category: "Fashion Show",
    caption:
      "Grand Runway Fashion Show — student-designed haute couture gowns presented by professional runway models.",
  },
  {
    id: "g-fashion-show-2",
    imageUrl: "/images/gallery/fashion-show-2.webp",
    category: "Fashion Show",
    caption:
      "Runway spotlight: intricate bridal silk drapes and bespoke festive garments crafted in our Coimbatore ateliers.",
  },
  {
    id: "g-fashion-show-3",
    imageUrl: "/images/gallery/fashion-show-3.webp",
    category: "Fashion Show",
    caption:
      "Couture exhibition and designer ramp walk celebrating creativity, fit perfection, and women designers.",
  },

  // 3. Haute Couture Masterpieces & Student Ateliers
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
    id: "g-founder-couture",
    imageUrl: "/images/founder_saree.png",
    category: "Bridal Blouses",
    caption:
      "Royal hand-embroidered blouse with heritage mandala motif and metallic antique embellishments.",
  },
  {
    id: "g-master-tailoring",
    imageUrl: "/images/courses/master-tailoring.jpg",
    category: "Bridal Blouses",
    caption:
      "Boutique-standard bridal blouse drafting with flawless seam finishing and zero-wrinkle fitting.",
  },
  {
    id: "g-advanced-aari",
    imageUrl: "/images/courses/advanced-aari.jpg",
    category: "Aari Embroidery",
    caption:
      "79-stitch bridal Aari embroidery showcase featuring gold zardozi wire and cutdana bead padding.",
  },
  {
    id: "g-hand-embroidery",
    imageUrl: "/images/courses/hand-embroidery.jpg",
    category: "Aari Embroidery",
    caption:
      "Timeless heritage hand embroidery and metallic zardozi detailing on rich silk velvet.",
  },
  {
    id: "g-designer-patterns",
    imageUrl: "/images/courses/designer-patterns.jpg",
    category: "Couture Gowns",
    caption:
      "High-fashion architectural silhouette gown with volume flare and structured bodice.",
  },
  {
    id: "g-terracotta-jewellery",
    imageUrl: "/images/courses/terracotta-jewellery.jpg",
    category: "Terracotta",
    caption:
      "Handcrafted terracotta designer necklace set with antique acrylic glazing and hollow beads.",
  },
  {
    id: "g-diploma-fashion",
    imageUrl: "/images/courses/diploma-fashion.jpg",
    category: "Student Fests",
    caption:
      "Student runway sketching and live mannequin draping during our annual design showcase.",
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
