export interface AdminEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseTitle: string;
  courseId?: string;
  message: string;
  status: "new" | "contacted" | "enrolled" | "closed";
  createdAt: string;
}

export interface AdminContestEntry {
  id: string;
  studentName: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  votesCount: number;
  isApproved: boolean;
  createdAt: string;
}

export const INITIAL_ADMIN_ENQUIRIES: AdminEnquiry[] = [
  {
    id: "enq-01",
    name: "Kavitha Rajendran",
    email: "kavitha.r@gmail.com",
    phone: "9842101234",
    courseTitle: "Self Designing Course (74 Steps)",
    message: "Interested in the offline weekend batch at Gandhipuram. Do you provide sewing machines for hands-on practice?",
    status: "new",
    createdAt: "2026-11-22T09:15:00.000Z",
  },
  {
    id: "enq-02",
    name: "Sangeetha Manikandan",
    email: "sangeetha.m@outlook.com",
    phone: "9789012345",
    courseTitle: "Advanced Aari Embroidery (92 Steps)",
    message: "Enquiring for my daughter. Does this include Zardosi, cut-work and bridal frame fitting? Please share fee details.",
    status: "contacted",
    createdAt: "2026-11-21T14:30:00.000Z",
  },
  {
    id: "enq-03",
    name: "Deepa Senthil",
    email: "deepa.senthil@yahoo.com",
    phone: "9443219876",
    courseTitle: "Designer Patterns & Gowns (36 Steps)",
    message: "I run a small boutique in Tiruppur. Want to upgrade to umbrella gowns and Indo-Western patterns. When does the next batch start?",
    status: "enrolled",
    createdAt: "2026-11-20T11:00:00.000Z",
  },
  {
    id: "enq-04",
    name: "Ananya Krishnan",
    email: "ananya.k@gmail.com",
    phone: "8056123456",
    courseTitle: "Terracotta Jewellery Making",
    message: "Looking for online classes with raw material kit dispatch to Madurai. Is certification recognized by Central Govt?",
    status: "new",
    createdAt: "2026-11-22T08:00:00.000Z",
  },
  {
    id: "enq-05",
    name: "Meenakshi Sundaram",
    email: "meenakshi.s@gmail.com",
    phone: "9488765432",
    courseTitle: "Diploma in Fashion Designing",
    message: "Can I attend from 10am to 1pm daily? Living in Gandhipuram near the bus stand.",
    status: "contacted",
    createdAt: "2026-11-19T16:45:00.000Z",
  },
];

export const INITIAL_CONTEST_ENTRIES: AdminContestEntry[] = [
  {
    id: "contest-01",
    studentName: "Dhivya Bharathi (Batch 2025)",
    title: "Peacock Royal Kanchipuram Bridal Gown",
    description: "Fusion Indo-Western circular gown handcrafted from pure Kanchipuram silk with intricate Aari zardosi collar neckline and 6-meter umbrella flare.",
    imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80",
    category: "Bridal Wear",
    votesCount: 342,
    isApproved: true,
    createdAt: "2026-11-15T10:00:00.000Z",
  },
  {
    id: "contest-02",
    studentName: "Nithya Ramachandran (Batch 2025)",
    title: "Handcrafted Temple Aari Blouse & Pleated Skirt",
    description: "Deep maroon velvet bridal blouse adorned with antique gold thread work, French knots, and 3D floral zardosi motifs, paired with pleated silk skirt.",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    category: "Aari Work",
    votesCount: 289,
    isApproved: true,
    createdAt: "2026-11-16T12:00:00.000Z",
  },
  {
    id: "contest-03",
    studentName: "Revathi Palanisamy (Batch 2026)",
    title: "Contemporary Indo-Western Cape Suit",
    description: "Georgette draped dhoti set with an embroidered floor-length organza cape featuring resham and mirror handwork. Self-drafted and stitched.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    category: "Designer Patterns",
    votesCount: 195,
    isApproved: true,
    createdAt: "2026-11-18T09:30:00.000Z",
  },
  {
    id: "contest-04",
    studentName: "Subha Lakshmanan (Batch 2025)",
    title: "Terracotta Lotus Bridal Choker Ensemble",
    description: "Eco-friendly kiln-baked clay jewellery painted with metallic gold and temple ruby tones, complemented by matching jhumkas and maang tikka.",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    category: "Jewellery Making",
    votesCount: 147,
    isApproved: true,
    createdAt: "2026-11-19T14:15:00.000Z",
  },
];
