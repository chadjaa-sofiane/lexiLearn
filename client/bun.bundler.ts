await Bun.build({
  entrypoints: [
    "./src/scripts/main.ts",
    "./src/scripts/content.js",
    "./src/background/background.ts",
  ],
  outdir: "./build",
  target: "browser"
});
