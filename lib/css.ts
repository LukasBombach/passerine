type Props = [string, string];

interface GetPropsOptions {
  modifier?: string;
}

const stateSelectors = /^\s*&:(\w+)\s*\{([^}]+)\}/gm;
const properties = /^\s*(\S+?)\s*:\s*(.+?)\s*;?$/gm;

export default function css([cssStr]: TemplateStringsArray): string {
  const props = getProps(cssStr);
  const states = getStates(cssStr);
  return [...props, ...states].join(" ");
}

function getProps(cssStr: string, options: GetPropsOptions = {}): string[] {
  const matches = getPropMatches(cssStr);
  const modifier = options.modifier ? `${options.modifier}-` : "";
  return matches
    .map(([, name, val]) => val.split(" ").map(v => [name, v]))
    .flat()
    .map(([name, val]) => `${modifier}${name}-${val}`);
}

function getStates(cssStr: string) {
  return getStateMatches(cssStr)
    .map(([, modifier, cssStr]) => getProps(cssStr, { modifier }))
    .flat();
}

function getPropMatches(cssStr: string) {
  const propsStr = cssStr.replace(stateSelectors, "");
  return [...propsStr.matchAll(properties)];
}

function getStateMatches(cssStr: string) {
  return [...cssStr.matchAll(stateSelectors)];
}
