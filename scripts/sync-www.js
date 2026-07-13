'use strict';
// Copies the game's web files into www/, which Capacitor bundles into the
// native iOS app (webDir can't be "." — Capacitor refuses to bundle the
// whole project root, since that would include node_modules, ios/, etc).
// Run this whenever index.html/style.css/game.js/lang.js/assets change,
// before `npx cap sync ios`.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const www  = path.join(root, 'www');

const FILES = ['index.html', 'style.css', 'game.js', 'lang.js'];
const DIRS  = ['assets', 'vendor'];

// Keep vendor snapshots in sync with installed node_modules versions.
const PLUGIN_SNAPSHOTS = [
  ['@capgo/native-purchases/dist/plugin.js', 'vendor/capacitor-native-purchases.js'],
];
for (const [src, dest] of PLUGIN_SNAPSHOTS) {
  fs.copyFileSync(path.join(root, 'node_modules', src), path.join(root, dest));
}

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www);

for (const file of FILES) {
  fs.copyFileSync(path.join(root, file), path.join(www, file));
}
for (const dir of DIRS) {
  fs.cpSync(path.join(root, dir), path.join(www, dir), { recursive: true });
}

console.log(`Synced ${FILES.length} file(s) and ${DIRS.length} folder(s) into www/`);
