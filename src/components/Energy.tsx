import cs from "./Energy.module.css";
import { BemFC } from "../utils";

type Props = {
  energyMax: number;
  energy: number;
};

const Energy: BemFC<Props> = ({ elem, energyMax, energy }) => {
  console.log("energy");

  const amount = energy / energyMax;
  const percent = Math.floor(amount * 100);
  return (
    <div className={`{cs['energy']} ${elem}`}>
      <span>Your Energy: {percent}%</span>
      <div className={cs["bar"]}>
        <span
          className={cs["bar__fill"]}
          style={{
            width: `${15 * amount}rem`,
          }}
        ></span>
      </div>
    </div>
  );
};

export type { Props };
export { Energy };
