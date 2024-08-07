import React, { useRef, useEffect } from "react";
import cs from "./Fruit.module.scss";
import { BemProps } from "../utils/bem";
import { Fruit as FruitT } from "../utils/fruit";

type Props = BemProps<{
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
  replayPulsing?: number;
  fruit: FruitT;
}>;

const Fruit: React.FC<Props> = ({
  elem = "",
  replayPulsing,
  onPointerDown,
  fruit,
}) => {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animation = "none";
      const playPulsingHandle = setTimeout(() => {
        ref!.current!.style.animation = "";
      }, 0);
      return () => {
        clearTimeout(playPulsingHandle);
      };
    }
  }, [replayPulsing]);

  return (
    <div className={`${cs["fruit"]} ${elem}`}>
      <img
        onPointerDown={onPointerDown}
        className={`${cs["fruit__img"]} ${elem}`}
        src={`./${fruit}.png`}
        ref={ref}
      />
      <span className={cs["fruit__shadow"]}></span>
    </div>
  );
};

export type { Props };
export { Fruit };
