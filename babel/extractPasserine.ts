import { types } from "@babel/core";
import { NodePath } from "@babel/traverse";
import { State } from "./types";

export function extractPasserine({ types: t }: { types: typeof types }) {
  return {
    visitor: {
      Program: {
        enter(path: NodePath<types.Program>, state: State) {
          debugger;
        },
      },
      TaggedTemplateExpression(
        path: NodePath<types.TaggedTemplateExpression>,
        state: State,
      ) {
        debugger;
      },
    },
  };
}
