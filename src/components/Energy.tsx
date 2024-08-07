import React from "react";
import cs from "./Energy.module.scss";
import { BemProps } from "../utils/bem";
import { ProgressBar } from "./ProgressBar";

type Props = BemProps<{
  widthMax: number;
  energyMax: number;
  energy: number;
}>;

const Energy: React.FC<Props> = ({
  elem = "",
  widthMax,
  energyMax,
  energy,
}) => {
  const amount = energy / energyMax;
  const percent = Math.floor(amount * 100);

  return (
    <div className={`${cs["energy"]} ${elem}`}>
      <span className={cs["energy__percent"]}>Your Energy: {percent}%</span>
      <ProgressBar
        elem={cs["energy__progress-bar"]}
        widthMax={widthMax}
        valueMax={energyMax}
        value={energy}
      />
    </div>
  );
};

export type { Props };
export { Energy };
