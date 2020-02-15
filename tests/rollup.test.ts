import { rollup } from "rollup";
import { InputOptions } from "rollup";
import * as extract from "../babel/extractPasserine";
import passerine from "../rollup";

describe("rollup", () => {
  const inputOptions: InputOptions = {
    input: "tests/__fixtures__/input.js",
    plugins: [passerine()],
  };

  test("rollup runs the extract function", async () => {
    const spy = jest.spyOn(extract, "extractPasserine");
    await rollup(inputOptions);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
