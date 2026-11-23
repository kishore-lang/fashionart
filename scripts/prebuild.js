const fs = require('fs');
const path = require('path');

const dirs = [
  '.next',
  '.next/static',
  '.next/static/chunks',
  '.next/static/chunks/app',
  '.next/static/chunks/pages',
  '.next/static/media',
  '.next/server',
  '.next/server/app',
  '.next/server/app/_not-found',
  '.next/server/app/about',
  '.next/server/app/achievements',
  '.next/server/app/admin',
  '.next/server/app/admin/enquiries',
  '.next/server/app/admin/courses',
  '.next/server/app/admin/gallery',
  '.next/server/app/admin/contest',
  '.next/server/app/contest',
  '.next/server/app/courses',
  '.next/server/app/courses/[slug]',
  '.next/server/app/gallery',
  '.next/server/app/testimonials',
  '.next/server/app/contact',
  '.next/server/app/dashboard',
  '.next/server/app/sign-in',
  '.next/server/app/sign-in/[[...sign-in]]',
  '.next/server/app/sign-up',
  '.next/server/app/sign-up/[[...sign-up]]',
  '.next/server/app/api',
  '.next/server/app/api/razorpay',
  '.next/server/app/api/razorpay/order',
  '.next/server/app/api/razorpay/verify',
  '.next/types',
  '.next/types/app',
];

for (const dir of dirs) {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

console.log('Build directories pre-created successfully.');
