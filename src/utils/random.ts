const randomElem = <A>(xs: ReadonlyArray<A>) => {
  return xs[Math.round(Math.random() * (xs.length - 1))];
};

export { randomElem };
