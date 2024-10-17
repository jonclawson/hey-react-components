const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');

const packageJson = require("./package.json");
const { string } = require("rollup-plugin-string");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve.default(),
      commonjs.default(),
      typescript.default({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist",
        rootDir: "./src",
        outDir: "./dist"
      }),
      string({
        include: "**/*.css",
      }),
      postcss({
        plugins: [autoprefixer()],
        extract: 'dist/index.css',
        minimize: true,
        sourceMap: true,
        // extensions: ['.css', '.scss'],
        extensions: ['.scss'],
      }),
    ],
    external: ["react", "react-dom"],
  }
];