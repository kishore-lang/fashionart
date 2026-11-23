const path = require('path');
const { execSync } = require('child_process');

const artifactDir = 'C:\\Users\\sakth\\.gemini\\antigravity\\brain\\09b65eec-4e62-4c0c-a0c3-19c20751fb42';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { path: '/sign-in', name: 'sign_in' },
  { path: '/contest', name: 'contest' },
  { path: '/admin', name: 'admin_overview' },
  { path: '/admin/enquiries', name: 'admin_enquiries' },
  { path: '/admin/courses', name: 'admin_courses' },
  { path: '/admin/gallery', name: 'admin_gallery' },
  { path: '/admin/contest', name: 'admin_contest' },
  { path: '/dashboard', name: 'student_dashboard' },
  { path: '/courses/self-designing-course', name: 'course_checkout' },
];

for (const r of routes) {
  const url = `http://localhost:3088${r.path}`;
  const outputPath = path.join(artifactDir, `phase3_${r.name}.png`);
  try {
    console.log(`Capturing ${url}...`);
    execSync(
      `"${chromePath}" --headless=new --disable-gpu --window-size=1280,900 --screenshot="${outputPath}" "${url}"`,
      { stdio: 'inherit' }
    );
    console.log(`Saved screenshot: phase3_${r.name}.png`);
  } catch (e) {
    console.warn(`Failed to capture ${r.name}:`, e.message);
  }
}

console.log('All screenshots captured successfully!');
