#!/usr/bin/env node

/**
 * Screenshot Capture Script for Design Comparison
 * 
 * This script automates taking screenshots of the current implementation
 * for comparison with Adobe XD designs.
 * 
 * Usage: node scripts/capture-screenshots.js
 * 
 * Requirements:
 * - puppeteer: npm install --save-dev puppeteer
 * - App running on http://localhost:3000
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '../docs/screenshots/implementation');
const BASE_URL = 'http://localhost:3000';

// Screenshot configurations
const SCREENSHOTS = [
  {
    name: 'desktop-full-layout',
    viewport: { width: 1440, height: 900 },
    description: 'Full desktop layout view',
  },
  {
    name: 'desktop-card-component',
    viewport: { width: 1440, height: 900 },
    description: 'Desktop card component focused view',
    selector: '.card-carousel', // Focus on card area
  },
  {
    name: 'desktop-card-carousel',
    viewport: { width: 1440, height: 900 },
    description: 'Desktop card carousel with navigation',
    selector: '.card-carousel',
  },
  {
    name: 'desktop-action-buttons',
    viewport: { width: 1440, height: 900 },
    description: 'Desktop action buttons section',
    selector: '.card-actions', // Assuming this class exists
  },
  {
    name: 'tablet-layout',
    viewport: { width: 768, height: 1024 },
    description: 'Tablet layout view',
  },
  {
    name: 'mobile-portrait',
    viewport: { width: 375, height: 812 },
    description: 'Mobile portrait layout',
  },
  {
    name: 'mobile-landscape',
    viewport: { width: 812, height: 375 },
    description: 'Mobile landscape layout',
  },
  {
    name: 'mobile-card-component',
    viewport: { width: 375, height: 812 },
    description: 'Mobile card component view',
    selector: '.card-carousel',
  },
];

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

async function captureScreenshot(page, config) {
  console.log(`📸 Capturing: ${config.name} (${config.viewport.width}x${config.viewport.height})`);
  
  // Set viewport
  await page.setViewport(config.viewport);
  
  // Wait for page to load and animations to complete
  await page.waitForTimeout(1000);
  
  // Take screenshot
  const screenshotPath = path.join(SCREENSHOT_DIR, `${config.name}.png`);
  
  if (config.selector) {
    // Screenshot specific element
    const element = await page.$(config.selector);
    if (element) {
      await element.screenshot({ path: screenshotPath });
    } else {
      console.warn(`⚠️  Selector not found: ${config.selector}, taking full page screenshot`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }
  } else {
    // Full page screenshot
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }
  
  console.log(`✅ Saved: ${screenshotPath}`);
}

async function captureModalScreenshots(page) {
  console.log('📸 Capturing modal screenshots...');
  
  // Desktop modal
  await page.setViewport({ width: 1440, height: 900 });
  
  // Click "Add New Card" button to open modal
  const addCardButton = await page.$('button:has-text("Add New Card")');
  if (addCardButton) {
    await addCardButton.click();
    await page.waitForTimeout(500); // Wait for modal animation
    
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'desktop-add-card-modal.png'),
      fullPage: true,
    });
    console.log('✅ Saved: desktop-add-card-modal.png');
    
    // Close modal
    const closeButton = await page.$('[aria-label="Close modal"], button:has-text("Cancel")');
    if (closeButton) {
      await closeButton.click();
      await page.waitForTimeout(500);
    }
  }
  
  // Mobile modal
  await page.setViewport({ width: 375, height: 812 });
  
  if (addCardButton) {
    await addCardButton.click();
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'mobile-add-card-modal.png'),
      fullPage: true,
    });
    console.log('✅ Saved: mobile-add-card-modal.png');
    
    // Close modal
    const closeButton = await page.$('[aria-label="Close modal"], button:has-text("Cancel")');
    if (closeButton) {
      await closeButton.click();
      await page.waitForTimeout(500);
    }
  }
}

async function captureFrozenCardStates(page) {
  console.log('📸 Capturing frozen card states...');
  
  // Try to find and click freeze button
  const freezeButton = await page.$('button:has-text("Freeze"), button:has-text("Unfreeze")');
  if (freezeButton) {
    await freezeButton.click();
    await page.waitForTimeout(500); // Wait for state change
    
    // Desktop frozen state
    await page.setViewport({ width: 1440, height: 900 });
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'desktop-card-frozen.png'),
      fullPage: true,
    });
    console.log('✅ Saved: desktop-card-frozen.png');
    
    // Mobile frozen state
    await page.setViewport({ width: 375, height: 812 });
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'mobile-card-frozen.png'),
      fullPage: true,
    });
    console.log('✅ Saved: mobile-card-frozen.png');
    
    // Unfreeze the card
    await freezeButton.click();
    await page.waitForTimeout(500);
  }
}

async function generateScreenshotIndex() {
  const indexContent = `# Implementation Screenshots

Generated on: ${new Date().toISOString()}

## Desktop Screenshots
- \`desktop-full-layout.png\` - Complete desktop layout
- \`desktop-card-component.png\` - Individual card component
- \`desktop-card-carousel.png\` - Card carousel with navigation
- \`desktop-action-buttons.png\` - Action buttons section
- \`desktop-add-card-modal.png\` - Add new card modal
- \`desktop-card-frozen.png\` - Frozen card state

## Mobile Screenshots
- \`mobile-portrait.png\` - Mobile portrait layout
- \`mobile-landscape.png\` - Mobile landscape layout
- \`mobile-card-component.png\` - Mobile card component
- \`mobile-add-card-modal.png\` - Mobile add card modal
- \`mobile-card-frozen.png\` - Mobile frozen card state

## Tablet Screenshots
- \`tablet-layout.png\` - Tablet layout view

## Usage
These screenshots are used for:
1. Design comparison with Adobe XD mockups
2. Regression testing for UI changes
3. Documentation of implementation progress
4. Pixel-perfect development reference

## Updating Screenshots
Run \`node scripts/capture-screenshots.js\` to regenerate all screenshots.
Make sure the development server is running on http://localhost:3000.
`;

  await fs.writeFile(
    path.join(SCREENSHOT_DIR, 'README.md'),
    indexContent
  );
  console.log('✅ Generated screenshot index');
}

async function main() {
  try {
    console.log('🚀 Starting screenshot capture...\n');
    
    // Ensure screenshot directory exists
    await ensureDirectoryExists(SCREENSHOT_DIR);
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
    });
    
    const page = await browser.newPage();
    
    // Navigate to app
    console.log(`🌐 Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    
    // Capture basic screenshots
    for (const config of SCREENSHOTS) {
      await captureScreenshot(page, config);
    }
    
    // Capture modal screenshots
    await captureModalScreenshots(page);
    
    // Capture frozen card states
    await captureFrozenCardStates(page);
    
    // Generate index
    await generateScreenshotIndex();
    
    await browser.close();
    
    console.log('\n🎉 Screenshot capture completed!');
    console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}`);
    
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { captureScreenshot, SCREENSHOTS };
`;

// Make script executable
chmod +x scripts/capture-screenshots.js