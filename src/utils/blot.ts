const blots = ["blot1", "blot2"] as const;

type Blot = (typeof blots)[number];

export type { Blot };
export { blots };
