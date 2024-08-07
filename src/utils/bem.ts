type BemProps<P extends object> = { elem?: string } & {
  [k in keyof P]: P[k];
};

export type { BemProps };
