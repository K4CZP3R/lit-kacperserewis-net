// Import rollup plugins
import html from "@web/rollup-plugin-html";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import summary from "rollup-plugin-summary";
// import json from "@rollup/plugin-json";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";

function getOutputDir(environment) {
  switch (environment) {
    case "production":
      return "build";
    case "development":
      return "dev-build";
    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
}

const COMMON_PLUGINS = [
  resolve({ browser: true }),
  commonjs(),
  summary(),
  copy({
    targets: [
      {
        src: "./node_modules/highlight.js/styles/a11y-dark.css",
        dest: getOutputDir(process.env.BUILD) + "/assets",
      },
    ],
  }),
];

function getOutputConfig(environment) {
  switch (environment) {
    case "production":
      return { dir: "build" };
    case "development":
      return {
        dir: "dev-build",
        sourcemap: true,
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-chunk.js",
      };
    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
}

function getPlugins(environment) {
  switch (environment) {
    case "development":
      return [
        html({
          input: "index.html",
        }),
        ...COMMON_PLUGINS,
        livereload(),
        serve({
          contentBase: "dev-build",
          open: false,
          historyApiFallback: true,
        }),
      ];
    case "production":
      return [
        html({
          input: "index.html",
        }),
        // Minify HTML template literals
        minifyHTML(),
        // Minify JS
        terser({
          ecma: 2020,
          module: true,
          warnings: true,
        }),
        ...COMMON_PLUGINS,
      ];
    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
}

export default {
  plugins: getPlugins(process.env.BUILD),
  output: getOutputConfig(process.env.BUILD),
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }

    // console.warn everything else
    console.warn(warning.message);
  },
  preserveEntrySignatures: "strict",
};
