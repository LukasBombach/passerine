import * as babel from "@babel/core";
import preset from "../babel";
import { name } from "../package.json";

interface Options {
  filename: string;
}

interface TransformResult {
  code: string;
  cssText?: string;
}

export default (source: string, { filename }: Options): TransformResult => {
  const result = babel.transformSync(source, {
    caller: { name },
    filename: filename,
    presets: [[preset]],
    babelrc: false,
    configFile: false,
    sourceMaps: false,
  })!;

  return { code: result.code! };
};
