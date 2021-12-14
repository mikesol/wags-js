export interface NonEmptyArray<A> extends Array<A> {
  0: A;
}

type CycleEnv = { weight: number; tag?: string };

type Cycle<T> =
  | {
      branching: { nel: NonEmptyArray<Cycle<T>>; env: CycleEnv };
    }
  | {
      simultaneous: { nel: NonEmptyArray<Cycle<T>>; env: CycleEnv };
    }
  | {
      internal: { nel: NonEmptyArray<Cycle<T>>; env: CycleEnv };
    }
  | { singleNote: { val: T; env: CycleEnv } };
