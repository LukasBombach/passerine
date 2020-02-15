import { types as t } from "@babel/core";
import { NodePath } from "@babel/traverse";

export enum ValueType {
  COMPONENT,
  LAZY,
  FUNCTION,
  VALUE,
}

export type Value = Function | string | number;

export type ComponentValue = {
  kind: ValueType.COMPONENT;
  ex: NodePath<t.Expression> | t.Expression | string;
};

export type LazyValue = {
  kind: ValueType.LAZY;
  ex: NodePath<t.Expression> | t.Expression | string;
};

export type FunctionValue = {
  kind: ValueType.FUNCTION;
  ex: any;
};

export type EvaluatedValue = {
  kind: ValueType.VALUE;
  value: Value;
};

export type ExpressionValue =
  | ComponentValue
  | LazyValue
  | FunctionValue
  | EvaluatedValue;
export type TemplateExpression = {
  styled?: { component: any };
  path: NodePath<t.TaggedTemplateExpression>;
  expressionValues: ExpressionValue[];
};
export type State = {
  queue: TemplateExpression[];
  rules: {
    [selector: string]: {
      className: string;
      displayName: string;
      cssText: string;
      start: Location | null | undefined;
    };
  };
  replacements: Array<{
    original: {
      start: Location;
      end: Location;
    };
    length: number;
  }>;
  index: number;
  dependencies: string[];
  file: {
    opts: {
      cwd: string;
      root: string;
      filename: string;
    };
    metadata: any;
  };
};
