const { spawn, execSync } = require('child_process');
const path = require('path');
const http = require('http');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function probe(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode);
    });
    req.on('error', () => resolve(null));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function main() {
  console.log('Starting Next.js production server for home page visual capture...');
  const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');
  const server = spawn(process.execPath, [nextBin, 'start', '-H', '127.0.0.1', '-p', '3099'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'ignore',
    env: { ...process.env, PORT: '3099' },
  });

  let ready = false;
  for (let i = 0; i < 20; i++) {
    await wait(1000);
    const code = await probe('http://127.0.0.1:3099/');
    if (code) {
      console.log(`Server ready on http://127.0.0.1:3099 (HTTP ${code})`);
      ready = true;
      break;
    }
  }

  if (!ready) {
    console.error('Server failed to start.');
    server.kill();
    process.exit(1);
  }

  const artifactDir = 'C:\\Users\\sakth\\.gemini\\antigravity\\brain\\09b65eec-4e62-4c0c-a0c3-19c20751fb42';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  try {
    // 1. Capture Full Home Page with Carousel & Studio
    console.log('Capturing home page...');
    execSync(
      `"${chromePath}" --headless=new --disable-gpu --window-size=1280,2400 --screenshot="${path.join(
        artifactDir,
        'home_with_carousel_and_cad.png'
      )}" "http://127.0.0.1:3099/"`,
      { stdio: 'ignore' }
    );
    console.log('Captured: home_with_carousel_and_cad.png');

    // 2. Mobile view
    console.log('Capturing mobile home page...');
    execSync(
      `"${chromePath}" --headless=new --disable-gpu --window-size=390,2400 --screenshot="${path.join(
        artifactDir,
        'home_mobile_carousel_studio.png'
      )}" "http://127.0.0.1:3099/"`,
      { stdio: 'ignore' }
    );
    console.log('Captured: home_mobile_carousel_studio.png');
  } catch (err) {
    console.warn('Capture error:', err.message);
  }

  server.kill();
  console.log('Capture script finished.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
