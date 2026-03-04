module {
  // No state change, only value change
  type Actor = {};

  public func run(old : Actor) : Actor {
    old;
  };
};
