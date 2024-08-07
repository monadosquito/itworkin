import React from "react";
import { BemProps } from "../utils/bem";
import { Blot as BlotT } from "../utils/blot";
import cs from "./Blot.module.scss";

type Props = BemProps<{
  pos: [number, number];
  coinsGain: number;
  blot: BlotT;
}>;

const Blot: React.FC<Props> = ({
  elem = "",
  coinsGain,
  pos: [top, left],
  blot,
}) => {
  return (
    <div
      className={`${cs["blot"]} ${elem}`}
      style={{ position: "absolute", left, top }}
    >
      <img className={cs["blot__img"]} src={`./${blot}.png`} />
      <span className={cs["blot__coins-gain"]}>{coinsGain}</span>
    </div>
  );
};

export { Blot };
