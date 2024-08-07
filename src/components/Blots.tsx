import React from "react";
import { BemProps } from "../utils/bem";
import { Tap } from "../utils/tap";
import { Blot } from "./Blot";

type Props = BemProps<{
  taps: Tap[];
}>;

const Blots: React.FC<Props> = ({ taps }) => {
  return (
    <>
      {taps.map(({ key, coinsGain, pos, blot }) => {
        return <Blot coinsGain={coinsGain} pos={pos} key={key} blot={blot} />;
      })}
    </>
  );
};

export type { Props };
export { Blots };
