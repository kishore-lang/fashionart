const { spawn, execSync } = require('child_process');
const http = require('http');
const path = require('path');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function probe(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode);
    });
    req.on('error', (err) => {
      resolve(null);
    });
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function main() {
  console.log('Spawning next start on 0.0.0.0:3088...');
  const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');
  const server = spawn(process.execPath, [nextBin, 'start', '-H', '0.0.0.0', '-p', '3088'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, PORT: '3088' },
  });

  let ready = false;
  let targetUrl = '';
  const candidateHosts = ['http://127.0.0.1:3088', 'http://localhost:3088'];

  for (let i = 0; i < 20; i++) {
    await wait(1000);
    for (const host of candidateHosts) {
      const code = await probe(`${host}/`);
      if (code) {
        console.log(`Successfully connected via ${host} (HTTP ${code})!`);
        targetUrl = host;
        ready = true;
        break;
      }
    }
    if (ready) break;
  }

  if (!ready) {
    console.error('Could not connect to server.');
    server.kill();
    process.exit(1);
  }

  const routes = [
    { path: '/sign-in', name: 'phase3_signin.png' },
    { path: '/contest', name: 'phase3_contest.png' },
    { path: '/admin', name: 'phase3_admin_overview.png' },
    { path: '/admin/enquiries', name: 'phase3_admin_enquiries.png' },
    { path: '/admin/courses', name: 'phase3_admin_courses.png' },
    { path: '/dashboard', name: 'phase3_dashboard.png' },
  ];

  const artifactDir = 'C:\\Users\\sakth\\.gemini\\antigravity\\brain\\09b65eec-4e62-4c0c-a0c3-19c20751fb42';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  for (const r of routes) {
    const fullUrl = `${targetUrl}${r.path}`;
    const code = await probe(fullUrl);
    console.log(`Checking ${fullUrl} -> Status: ${code}`);

    const outputPath = path.join(artifactDir, r.name);
    try {
      execSync(
        `"${chromePath}" --headless=new --disable-gpu --window-size=1280,900 --screenshot="${outputPath}" "${fullUrl}"`,
        { stdio: 'ignore' }
      );
      console.log(`Captured screenshot: ${r.name}`);
    } catch (e) {
      console.warn(`Screenshot error for ${r.name}:`, e.message);
    }
  }

  console.log('Finished capturing all backend pages!');
  server.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
