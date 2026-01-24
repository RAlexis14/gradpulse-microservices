const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const webDist = path.join(__dirname, "..", "web", "dist");
const out = path.join(__dirname, "renderer-dist");

if (!fs.existsSync(webDist)) {
  console.error("web/dist not found. Run: npm --prefix ../web run build");
  process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
copyDir(webDist, out);
console.log("Copied web/dist -> desktop/renderer-dist");
