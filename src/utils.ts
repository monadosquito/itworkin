import React from "react";

type BemProps<A extends object> = { elem?: string } & {
  [k in keyof A]: A[k];
};

type BemFC<A extends object> = React.FC<BemProps<A>>;

export type { BemFC };
