import { createFilter } from "rollup-pluginutils";
import transform from "./transform";
import slugify from "./slugify";

type RollupPluginOptions = {
  include?: string | string[];
  exclude?: string | string[];
};

export default function passerine({
  include,
  exclude,
}: RollupPluginOptions = {}) {
  const filter = createFilter(include, exclude);
  const cssLookup: Record<string, string> = {};

  return {
    name: "passerine",
    load(id: string) {
      return cssLookup[id];
    },
    resolveId(id: string) {
      if (id in cssLookup) return id;
    },
    transform(code: string, id: string) {
      if (!filter(id)) return;

      const result = transform(code, { filename: id });

      if (!result.cssText) return;

      const slug = slugify(id);
      const slugId = JSON.stringify(`${id.replace(/\.js$/, "")}_${slug}.css`);
      const transformedCode = `${result.code}\nimport ${slugId};\n`;

      cssLookup[id] = result.cssText;

      return { code: transformedCode };
    },
  };
}
