const fruits = [
  "fruit1",
  "fruit2",
  "fruit3",
  "fruit4",
  "fruit5",
  "fruit6",
  "fruit7",
  "fruit8",
  "fruit9",
  "fruit10",
] as const;

type Fruit = (typeof fruits)[number];

export type { Fruit };
export { fruits };
