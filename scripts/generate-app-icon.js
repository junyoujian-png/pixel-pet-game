'use strict';
// Generates assets/icon-1024.png from the red panda pet artwork (scaled to
// fit, centered, on a solid background) and copies it into the iOS
// AppIcon.appiconset slot that Contents.json already declares — this project
// uses the modern single-image (1024x1024, idiom "universal") icon format,
// so no other sizes need to be generated.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SRC = path.join(root, 'assets', 'pets', '紅浣熊.png');
const OUT = path.join(root, 'assets', 'icon-1024.png');
const IOS_ICON = path.join(root, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset', 'AppIcon-512@2x.png');

const CANVAS_SIZE = 1024;
const ARTWORK_SIZE = 880; // leaves a margin so iOS's rounded-corner mask doesn't clip the art
const BACKGROUND = '#f5f3ee';

async function main() {
  const artwork = await sharp(SRC)
    .resize(ARTWORK_SIZE, ARTWORK_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: CANVAS_SIZE, height: CANVAS_SIZE, channels: 3, background: BACKGROUND },
  })
    .composite([{ input: artwork, gravity: 'center' }])
    .flatten({ background: BACKGROUND })
    .removeAlpha() // App Store icons must have no alpha channel, even if fully opaque
    .png({ palette: false })
    .toFile(OUT);

  fs.copyFileSync(OUT, IOS_ICON);

  console.log(`Wrote ${OUT}`);
  console.log(`Copied to ${IOS_ICON}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
