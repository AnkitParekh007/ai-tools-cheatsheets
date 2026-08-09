const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = process.env.CAPTURE_BASE_URL || 'https://ankitparekh007.github.io/ai-tools-cheatsheets/';
const outputDir = process.env.CAPTURE_OUTPUT_DIR || path.join(process.cwd(), 'public-proof-captures');
fs.mkdirSync(outputDir, { recursive: true });

const surfaces = [
  ['handbook-home', ''],
  ['architecture-path', 'architecture-path/'],
  ['comparison-matrix', 'getting-started/comparison-matrix.html'],
  ['contribution-map', 'community/ecosystem-contribution-map.html'],
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();
  const manifest = [];

  for (const [name, relative] of surfaces) {
    const requestedUrl = new URL(relative, baseUrl).toString();
    const response = await page.goto(requestedUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1200);
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    manifest.push({ name, file: path.basename(file), requestedUrl, finalUrl: page.url(), status: response ? response.status() : null });
  }

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
