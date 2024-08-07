import React from "react";
import { BemProps } from "../utils/bem";
import cs from "./ProgressBar.module.scss";

type Props = BemProps<{
  widthMax: number;
  valueMax: number;
  value: number;
}>;

const ProgressBar: React.FC<Props> = ({
  elem = "",
  widthMax,
  valueMax,
  value,
}) => {
  const a = value / valueMax;

  return (
    <div className={`${cs["bar"]} ${elem}`}>
      <span className={cs["bar__fill"]} style={{ width: `${widthMax * a}rem` }}>
        {value}
      </span>
    </div>
  );
};

export type { Props };
export { ProgressBar };
