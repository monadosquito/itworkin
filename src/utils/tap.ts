import { Blot } from "./blot";

type Pos = [number, number];
type Tap = {
  key: number;
  coinsGain: number;
  pos: Pos;
  blot: Blot;
};

export type { Tap };
