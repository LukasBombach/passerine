import { extractPasserine } from "./extractPasserine";

export default function passerine() {
  return {
    plugins: [extractPasserine],
  };
}
