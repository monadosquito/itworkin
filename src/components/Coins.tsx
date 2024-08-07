import React from "react";
import { BemProps } from "../utils/bem";
import cs from "./Coins.module.scss";

type Props = BemProps<{
  coins: number;
}>;

const Coins: React.FC<Props> = ({ elem = "", coins }) => {
  return (
    <div className={`${cs["coins"]} ${elem}`}>
      <img className={cs["coins__img"]} src="./coin.png" />
      <span className={cs["coins__count"]}>{coins}</span>
    </div>
  );
};

export type { Props };
export { Coins };
