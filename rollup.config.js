/* eslint-disable import/no-anonymous-default-export */
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/ZoombiesHeader.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      postcss({
        extensions: [".css"],
      }),
      nodeResolve(),
      babel({
        presets: ["@babel/preset-react"],
      }),
      commonjs(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
