export interface CourseData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  category: "Fashion Designing" | "Tailoring" | "Embroidery" | "Jewellery";
  mode: "online" | "offline" | "both";
  price: number;
  durationDays: number;
  stepsCount: number;
  thumbnailUrl: string;
  syllabus: {
    title: string;
    items: string[];
  }[];
  nuances: string[];
  isFeatured: boolean;
  isPublished: boolean;
}

export const SEED_COURSES: CourseData[] = [
  {
    slug: "fashion-designing-diploma",
    title: "Professional Diploma in Fashion Designing",
    description:
      "Our premier classroom diploma program in Gandhipuram, Coimbatore. Master fashion illustration, color theory, garment construction, boutique management, and runway styling with personal mentorship.",
    category: "Fashion Designing",
    mode: "offline",
    price: 24999,
    durationDays: 365,
    stepsCount: 150,
    thumbnailUrl: "/images/courses/diploma-fashion.jpg",
    syllabus: [
      {
        title: "Module 1: Fashion Illustration & Trend Forecasting",
        items: [
          "Croquis drawing (10-head and 12-head fashion figures)",
          "Fabric rendering (velvet, silk, chiffon, denim)",
          "Mood boards, theme conceptualization, and portfolio curation",
        ],
      },
      {
        title: "Module 2: Pattern Drafting & Couture Construction",
        items: [
          "Flat pattern cutting and live mannequin draping",
          "Western gowns, jumpsuits, corsets, and co-ord sets",
          "Ethnic bridal wear, lehengas, and designer jackets",
        ],
      },
      {
        title: "Module 3: Boutique Management & Entrepreneurship",
        items: [
          "Costing, fabric sourcing in wholesale markets, client consultation",
          "Branding, social media marketing, and boutique setup guidance",
          "Central Government recognized certification assessment",
        ],
      },
    ],
    nuances: [
      "Commercial garment costing and margin calculations",
      "Sourcing fabrics in Surat, Bangalore, and Erode textile hubs",
      "Client trial correction and body balance adjustments",
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "men-garments",
    title: "Men Garments Foundation",
    description:
      "Essential foundation course covering men's traditional and casual tailored garments. Learn drafting, pocket construction, collar shaping, and clean cuff finishes.",
    category: "Tailoring",
    mode: "online",
    price: 0,
    durationDays: 90,
    stepsCount: 8,
    thumbnailUrl: "/images/courses/men-garments.jpg",
    syllabus: [
      {
        title: "Module 1: Men's Body Measurement & Anatomy",
        items: [
          "Chest, shoulder slope, and bicep measurement standards",
          "Drafting classic men's shirts and kurtas",
        ],
      },
      {
        title: "Module 2: Details & Finishes",
        items: [
          "Mandarin and classic shirt collars with interlining",
          "Single and double buttoned cuffs",
          "Single bone welt pocket and shirt patch pockets",
          "Traditional men's elasticated and drawstring pyjamas",
        ],
      },
    ],
    nuances: [
      "Crisp collar tips with point turners",
      "Sleeve placket topstitching precision",
      "Reinforcing pocket stress points",
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "terracotta-jewellery-making",
    title: "Terracotta Jewellery Making",
    description:
      "Transform natural earthen clay into exquisite handcrafted eco-friendly designer jewelry. Learn clay processing, sculpting, kiln baking, acrylic color blending, and waterproof varnishing.",
    category: "Jewellery",
    mode: "both",
    price: 2999,
    durationDays: 365,
    stepsCount: 20,
    thumbnailUrl: "/images/courses/terracotta-jewellery.jpg",
    syllabus: [
      {
        title: "Module 1: Clay Preparation & Curing",
        items: [
          "Refining natural clay, removing air bubbles",
          "Texture rolling and thickness standardization",
          "Mould usage vs free-hand organic sculpting",
        ],
      },
      {
        title: "Module 2: Jhumkas, Neckpieces & Beads",
        items: [
          "Hollow lightweight jhumkas and ear studs",
          "Choker pendants, peacocks, floral statements",
          "Hand-rolled beads, tubular beads, and bead hole piercing",
        ],
      },
      {
        title: "Module 3: Firing, Painting & Assembly",
        items: [
          "Home-baking methods and terracotta kiln firing",
          "Metallic and antique paint blending techniques",
          "Waterproof protective sealant coating & stringing with dori",
        ],
      },
    ],
    nuances: [
      "Preventing cracks during drying and baking",
      "Achieving hollow jhumkas that are ultralight to wear",
      "Rich antique gold rubbing technique on terracotta",
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "advanced-aari-embroidery",
    title: "Advanced Aari Embroidery",
    description:
      "Master royal bridal embroidery. Learn 79 traditional and modern stitch types using fine Aari needles, zardozi gold wire, cutdana beads, and silk threads to design high-value bridal blouses and designer sarees.",
    category: "Embroidery",
    mode: "both",
    price: 4999,
    durationDays: 180,
    stepsCount: 92,
    thumbnailUrl: "/images/courses/advanced-aari.jpg",
    syllabus: [
      {
        title: "Module 1: Needle Grip & Thread Handling",
        items: [
          "Aari needle numbers (14, 24) and tension mastery",
          "Chain stitch, reverse chain, and knotting variations",
          "Zari thread speed work without snagging",
        ],
      },
      {
        title: "Module 2: 79 Unique Stitch Variations",
        items: [
          "Feather stitch, herringbone, matty filling, and French knots",
          "Water filling stitch, honeycomb, and embossed floral padding",
          "3D organza cutwork and cutdana linear shading",
        ],
      },
      {
        title: "Module 3: Zardozi & Bridal Motifs",
        items: [
          "Spring bullion wire (zardozi) spring cutting & couching",
          "Peacock, mango (paisley), and temple jewelry motifs",
          "Mirror work, Kundan stone fixing, and bridal blouse neck framing",
        ],
      },
    ],
    nuances: [
      "Uniform bead spacing without thread showing",
      "Anti-puckering wooden cot frame stretching",
      "Speed lining techniques for commercial bridal blouse orders",
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "designer-patterns-advanced",
    title: "Designer Patterns (Advanced Designing)",
    description:
      "Level up to high-fashion western and fusion couture. Learn architectural silhouettes, volume gowns, flowy flare structures, and upcycling heirloom sarees into royal red-carpet gowns.",
    category: "Fashion Designing",
    mode: "both",
    price: 3999,
    durationDays: 120,
    stepsCount: 36,
    thumbnailUrl: "/images/courses/designer-patterns.jpg",
    syllabus: [
      {
        title: "Module 1: Flared Silhouettes & Geometry",
        items: [
          "A-line flowy gowns with structured bodices",
          "Grand Anarkali panels: 16, 24, and 32 kali drafting",
          "Umbrella flare gown pattern cutting",
        ],
      },
      {
        title: "Module 2: Circular & High-Volume Couture",
        items: [
          "Full 360-degree and double circular gowns",
          "Cascading maxi dresses with tiered gathers",
          "Corset-style boning and inner crinoline net cancan",
        ],
      },
      {
        title: "Module 3: Upcycling - Saree to Luxury Gown",
        items: [
          "Repurposing heavy Kanjivaram and Banarasi pallu placements",
          "Border detailing on hemlines and sleeves",
          "Creating fusion capes and draped dupatta attachments",
        ],
      },
    ],
    nuances: [
      "Even hem-line hanging calculation for full circle gowns",
      "Weight distribution for heavy silk flare",
      "Cancan cage attachment techniques without bulky waistlines",
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "self-designing-course",
    title: "Self Designing Course",
    description:
      "A comprehensive, hands-on mastercourse covering essential garment design from scratch. Perfect for homemakers, aspiring boutique owners, and students wanting to master everyday Indian and Western wear with flawless fitting.",
    category: "Fashion Designing",
    mode: "both",
    price: 3999,
    durationDays: 180,
    stepsCount: 74,
    thumbnailUrl: "/images/courses/self-designing.jpg",
    syllabus: [
      {
        title: "Module 1: Foundations & Body Measurements",
        items: [
          "Understanding silhouette and body proportion",
          "Precise measurement techniques for all figures",
          "Drafting paper patterns with ease",
        ],
      },
      {
        title: "Module 2: Salwar & Kameez Masterclass",
        items: [
          "Standard & straight cut kameez",
          "Designer neck variations (sweetheart, boat neck, keyhole)",
          "Traditional & contemporary Patiala salwar drafting",
          "A-line & side-slit kurtis",
        ],
      },
      {
        title: "Module 3: Blouse Designing & Princess Cut",
        items: [
          "Classic 4-tuck South Indian blouse",
          "Padded princess cut blouse with perfect cup shaping",
          "Backless, dori, and trendy blouse necklines",
          "Finishing seams, bias binding, and hook-eye plackets",
        ],
      },
      {
        title: "Module 4: Kids Wear & Frocks",
        items: [
          "Gathered party wear frocks",
          "Pleated umbrella cut dresses for young girls",
          "Fabric manipulation and lace embellishments",
        ],
      },
    ],
    nuances: [
      "No-wrinkle armhole cutting formula",
      "Perfect neckline depth without shoulder dropping",
      "Dart manipulation for zero-bunching bust fit",
      "Fabric grain alignment for straight hanging falls",
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "traditional-hand-embroidery",
    title: "Traditional Hand Embroidery & Zardozi",
    description:
      "Learn timeless Indian hand embroidery stitches: Kasuti, Kantha, Phulkari, Chikankari stitches, and heavy Zardozi metallic craftsmanship on luxurious silks.",
    category: "Embroidery",
    mode: "offline",
    price: 8999,
    durationDays: 90,
    stepsCount: 45,
    thumbnailUrl: "/images/courses/hand-embroidery.jpg",
    syllabus: [
      {
        title: "Module 1: Heritage Hand Stitches",
        items: [
          "Kantha running stitch and geometric Phulkari darn stitch",
          "Chikankari shadow work and inverted tepchi",
          "Mirror attachment, gota patti work, and bead embellishments",
        ],
      },
      {
        title: "Module 2: Bridal Finishing & Placement",
        items: [
          "Border tracing and chemical stencil transfer",
          "Bridal neckline design compositions",
          "Finishing and preservation of embroidered silks",
        ],
      },
    ],
    nuances: [
      "Tracing patterns onto delicate sheer fabrics without smudging",
      "Tension control to prevent fabric puckering on wooden hoop",
      "Knot-free thread transitions",
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    slug: "master-tailoring-classes",
    title: "Master Tailoring Classes (Basic to Advanced)",
    description:
      "Step-by-step practical tailoring training. Ideal for beginners and intermediate stitchers looking to produce boutique-standard outfits with commercial speed and accuracy.",
    category: "Tailoring",
    mode: "offline",
    price: 14999,
    durationDays: 120,
    stepsCount: 65,
    thumbnailUrl: "/images/courses/master-tailoring.jpg",
    syllabus: [
      {
        title: "Module 1: Machine Operation & Stitch Mastery",
        items: [
          "Single needle industrial and motorized sewing machine handling",
          "Pressure foot adjustment, bobbin tension, and needle selection",
          "Straight lines, curves, hems, and French seams",
        ],
      },
      {
        title: "Module 2: Comprehensive Women's Wear",
        items: [
          "Simple & designer blouses (katori, princess cut, collar neck)",
          "Anarkalis, umbrella cut, feeding kurtis, and nightwear",
          "Palazzo pants, cigarette pants, and tulip salwars",
        ],
      },
    ],
    nuances: [
      "Eliminating puffing near shoulder joints",
      "Hidden piping installation along curved necklines",
      "Fast hook and eye attachment methods",
    ],
    isFeatured: true,
    isPublished: true,
  },
];
