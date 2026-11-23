export interface InstagramReelItem {
  id: string;
  reelId: string;
  handle: string;
  handleUrl: string;
  authorName: string;
  reelUrl: string;
  title: string;
  caption: string;
  tag: string;
  aspect: string;
}

export interface InstagramPostItem {
  id: string;
  postId: string;
  handle: string;
  handleUrl: string;
  authorName: string;
  postUrl: string;
  title: string;
  caption: string;
  tag: string;
  thumbnailUrl: string;
}

export const INSTAGRAM_REELS: InstagramReelItem[] = [
  {
    id: "reel-1",
    reelId: "DfkfIepBR3g",
    handle: "@s_u_g_i_f_a_s_h_i_o_n_a_r_t",
    handleUrl: "https://www.instagram.com/s_u_g_i_f_a_s_h_i_o_n_a_r_t/",
    authorName: "Suguna Shanmugam",
    reelUrl: "https://www.instagram.com/s_u_g_i_f_a_s_h_i_o_n_a_r_t/reel/DfkfIepBR3g/",
    title: "Couture Masterclass & Atelier Highlights",
    caption: "Director Suguna Shanmugam presenting exclusive couture finishing and bridal craftsmanship.",
    tag: "Director's Cut",
    aspect: "9:16",
  },
  {
    id: "reel-2",
    reelId: "DffLmmEA21-",
    handle: "@unique_attire_by_saranya",
    handleUrl: "https://www.instagram.com/unique_attire_by_saranya/",
    authorName: "Saranya • Unique Attire",
    reelUrl: "https://www.instagram.com/unique_attire_by_saranya/reel/DffLmmEA21-/",
    title: "Boutique Atelier Launch Story",
    caption: "Alumni Saranya showcasing her thriving boutique brand and bespoke bridal orders.",
    tag: "Alumni Boutique",
    aspect: "9:16",
  },
  {
    id: "reel-3",
    reelId: "DfXGxQuS3V8",
    handle: "@fashion_art_cbe",
    handleUrl: "https://www.instagram.com/fashion_art_cbe/",
    authorName: "Fashion Art Coimbatore",
    reelUrl: "https://www.instagram.com/fashion_art_cbe/reel/DfXGxQuS3V8/",
    title: "Runway & Student Couture Show",
    caption: "Live runway glamour featuring handcrafted ensembles created by our diploma designers.",
    tag: "Runway Live",
    aspect: "9:16",
  },
  {
    id: "reel-4",
    reelId: "DfUYCU0SKga",
    handle: "@fashion_art_cbe",
    handleUrl: "https://www.instagram.com/fashion_art_cbe/",
    authorName: "Fashion Art Coimbatore",
    reelUrl: "https://www.instagram.com/fashion_art_cbe/reel/DfUYCU0SKga/",
    title: "Hands-on Practical Drafting Session",
    caption: "Behind the seams at our Gandhipuram studio: pattern making and precision cutting.",
    tag: "Classroom Craft",
    aspect: "9:16",
  },
  {
    id: "reel-5",
    reelId: "DfSdlj8yXAg",
    handle: "@fashion_art_cbe",
    handleUrl: "https://www.instagram.com/fashion_art_cbe/",
    authorName: "Fashion Art Coimbatore",
    reelUrl: "https://www.instagram.com/fashion_art_cbe/reel/DfSdlj8yXAg/",
    title: "Bridal Aari Stitches & Royal Zardozi",
    caption: "Intricate metallic zardozi and beadwork techniques in our advanced embroidery lab.",
    tag: "Aari Lab",
    aspect: "9:16",
  },
  {
    id: "reel-6",
    reelId: "DfRj9XetCDz",
    handle: "@zahrins_de_studio",
    handleUrl: "https://www.instagram.com/zahrins_de_studio/",
    authorName: "Zahrin • De Studio",
    reelUrl: "https://www.instagram.com/zahrins_de_studio/reel/DfRj9XetCDz/",
    title: "Designer Silhouette Masterpiece",
    caption: "Alumni Zahrin presenting custom couture fits and contemporary designer collections.",
    tag: "Student Brand",
    aspect: "9:16",
  },
  {
    id: "reel-7",
    reelId: "DfRJvamSVMj",
    handle: "@varnam_by_kriti",
    handleUrl: "https://www.instagram.com/varnam_by_kriti/",
    authorName: "Kriti • Varnam",
    reelUrl: "https://www.instagram.com/varnam_by_kriti/reel/DfRJvamSVMj/",
    title: "Vibrant Fusion Gowns & Drapes",
    caption: "Varnam by Kriti boutique highlights: color palettes and royal Indian-Western fusion wear.",
    tag: "Alumni Boutique",
    aspect: "9:16",
  },
  {
    id: "reel-8",
    reelId: "DfIBQggJAN5",
    handle: "@styled_by_kthi",
    handleUrl: "https://www.instagram.com/styled_by_kthi/",
    authorName: "Keerthi • Styled By Kthi",
    reelUrl: "https://www.instagram.com/styled_by_kthi/reel/DfIBQggJAN5/",
    title: "Bridal Styling & Blouse Elegance",
    caption: "Keerthi's bridal styling journey: custom blouse fits, contrast piping, and client trials.",
    tag: "Styling Studio",
    aspect: "9:16",
  },
  {
    id: "reel-9",
    reelId: "Der1OHKyai-",
    handle: "@fashion_art_cbe",
    handleUrl: "https://www.instagram.com/fashion_art_cbe/",
    authorName: "Fashion Art Coimbatore",
    reelUrl: "https://www.instagram.com/fashion_art_cbe/reel/Der1OHKyai-/",
    title: "Festive Couture Exhibition & Graduation",
    caption: "Annual convocation celebration and student runway exhibition in Coimbatore.",
    tag: "Celebration",
    aspect: "9:16",
  },
];

export const INSTAGRAM_POSTS: InstagramPostItem[] = [
  {
    id: "post-1",
    postId: "De_hMreyWzk",
    handle: "@renu_fashion_magic",
    handleUrl: "https://www.instagram.com/renu_fashion_magic/",
    authorName: "Renu Fashion Magic",
    postUrl: "https://www.instagram.com/renu_fashion_magic/p/De_hMreyWzk/",
    title: "Boutique Atelier Showcase",
    caption: "Exquisite bridal blouse and bespoke designer wear drafted with Fashion Art Institute formulas.",
    tag: "Alumni Atelier",
    thumbnailUrl: "/images/gallery/piano-couture-gown.webp",
  },
  {
    id: "post-2",
    postId: "De_JAW9EYNp",
    handle: "@aathi_nathi_vibes",
    handleUrl: "https://www.instagram.com/aathi_nathi_vibes/",
    authorName: "Aathi Nathi Vibes",
    postUrl: "https://www.instagram.com/aathi_nathi_vibes/p/De_JAW9EYNp/",
    title: "Handcrafted Heritage Collection",
    caption: "Timeless traditional ensembles and intricate necklines created for custom client orders.",
    tag: "Boutique Creation",
    thumbnailUrl: "/images/courses/advanced-aari.jpg",
  },
  {
    id: "post-3",
    postId: "De9v7DEGFen",
    handle: "@dhiyash_designs",
    handleUrl: "https://www.instagram.com/dhiyash_designs/",
    authorName: "Dhiyash Designs",
    postUrl: "https://www.instagram.com/dhiyash_designs/p/De9v7DEGFen/",
    title: "Couture Silhouette & Pleated Flair",
    caption: "Signature festive garments and volume gown structures from Dhiyash Designs boutique studio.",
    tag: "Designer Label",
    thumbnailUrl: "/images/courses/designer-patterns.jpg",
  },
  {
    id: "post-4",
    postId: "De8xqU3k_E1",
    handle: "@_justclar_",
    handleUrl: "https://www.instagram.com/_justclar_/",
    authorName: "Just Clar",
    postUrl: "https://www.instagram.com/_justclar_/p/De8xqU3k_E1/",
    title: "Avant-Garde Runway Aesthetics",
    caption: "High-fashion conceptual styling, monochrome drape geometry, and editorial photography.",
    tag: "Runway Concept",
    thumbnailUrl: "/images/gallery/piano-couture-gown.webp",
  },
];
