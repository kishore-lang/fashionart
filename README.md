# Fashion Art Institute for Creative Skills

A modern, animated, premium web platform for **Fashion Art Institute for Creative Skills**, a premier women's fashion designing, tailoring, and embroidery institute based in Gandhipuram, Coimbatore, Tamil Nadu, India.

---

## 💎 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL) using `@neondatabase/serverless` with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/) (role-based: `publicMetadata.role = "admin" | "student"`)
- **Email**: [Resend](https://resend.com/) for automated admission enquiries
- **Integrations**: Google Sheets Webhook, Direct WhatsApp click-to-chat
- **Deployment**: Vercel

---

## 🎨 Design System

- **Brand Colors**:
  - Primary: Deep Chocolate Brown (`#4A2511`)
  - Accent: Golden Yellow (`#E8B520`)
  - Background: Warm Cream (`#FBF6EE`)
  - Soft Accent: Rose Blush (`#F4DCD6`)
- **Typography**: Playfair Display (Headings) & Poppins (Body) via `next/font`
- **Animations**: Framer Motion scroll reveals, hover lifts, floating badges, and viewport count-up counters with `prefers-reduced-motion` compliance.

---

## 🚀 Setup & Installation

### 1. Clone the repository & install dependencies

```bash
git clone <repo-url>
cd fashionart
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file by copying `.env.example`:

```bash
cp .env.example .env.local
```

Fill in your service credentials:

```env
# Neon Database (Serverless PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-example-pooler.us-east-2.aws.neon.tech/fashionart?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://username:password@ep-example.us-east-2.aws.neon.tech/fashionart?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Resend
RESEND_API_KEY="re_..."
RESEND_ADMIN_EMAIL="fashionartcbe@gmail.com"

# Google Sheets Webhook
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER="917397526669"
NEXT_PUBLIC_INSTITUTE_PHONE="+91 73975 26669"
NEXT_PUBLIC_INSTITUTE_EMAIL="fashionartonline@gmail.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Setup Neon Database & Run Migrations

1. Sign up / log in to [Neon](https://neon.tech/) and create a project named `fashionart`.
2. Copy the **Pooled connection string** into `DATABASE_URL`.
3. Copy the **Direct (unpooled) connection string** into `DATABASE_URL_UNPOOLED`.
4. Generate and run the migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```
5. Seed the database with the real institute courses:
   ```bash
   npm run db:seed
   ```
6. (Optional) Launch Drizzle Studio to inspect your database:
   ```bash
   npm run db:studio
   ```

### 4. Clerk Role-Based Access Setup

1. Create a project at [Clerk](https://clerk.com/).
2. Under **User & Authentication > Users**, select an admin user.
3. In **Public Metadata**, set:
   ```json
   {
     "role": "admin"
   }
   ```
4. All authorization is checked server-side using `lib/clerk.ts` via `verifyAdmin()`.

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 🏛️ Phase 1 Delivered Features

- **Sticky Navigation**: Responsive boutique header with desktop links, mobile hamburger drawer, and phone CTA.
- **Floating WhatsApp**: Available on all pages with pre-filled enquiry text.
- **Home Page**:
  - Hero with animated floating cards & trust tags.
  - "Why Choose Us" with 6 icon cards.
  - Featured Courses grid from database.
  - Animated Count-up achievements counter (3,500+ students, 4,800+ projects, 8+ years, 20+ designers).
  - Universal Record Forum (URF 2022) World Record banner.
  - Founder section spotlighting State Awardee Suguna Shanmugam.
  - Events timeline (Fashion Art Fest 2019, 2021, 2022, 2024).
  - Testimonial slider and Instagram feed banner (`@fashion_art_cbe`).
  - Comprehensive boutique footer.
- **About Page**: Institute founding story, 2009–2025 milestone timeline, vision and mission statements.
- **Courses Listing**: Filterable by mode (Online / Offline / Hybrid) and Stream (Designing, Tailoring, Embroidery, Jewellery).
- **Course Detail (`/courses/[slug]`)**: Nuances covered, dynamic syllabus module accordions, pricing, and direct enrollment buttons.
- **Contact Page**: Zod-validated enquiry form with honeypot spam protection, IP-based hourly rate limiting, Neon DB insertion, Google Sheet sync, Resend email dispatch, and Google Maps embed.
- **SEO**: Dynamic Open Graph metadata, JSON-LD Schema (`EducationalOrganization` / `LocalBusiness`), `sitemap.xml`, and `robots.txt`.
