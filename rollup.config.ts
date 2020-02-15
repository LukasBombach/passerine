import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import autoExternal from "rollup-plugin-auto-external";
import pkg from "./package.json";

export default {
  input: "lib/index.ts",
  output: {
    file: pkg.main,
    format: "cjs",
  },
  plugins: [
    autoExternal(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
};
