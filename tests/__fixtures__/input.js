import { css } from "passerine";

const primary = css`
  text: white;
  background: primary;
  border: round;
  vertical-padding: 24;
  horizontal-padding: 40;

  &:hover {
    background: accent;
  }
`;

export default primary;
