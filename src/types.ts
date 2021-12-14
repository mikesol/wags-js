// ps
export type PSCycle = void & { _: 'PSCycle' };
export type PSCycleEnv = void & { _: 'PSCycleEnv' };

// ts
export interface NonEmptyArray<A> extends Array<A> {
  0: A;
}

export type CycleEnv = { weight: number; tag?: string };

export type Cycle<T> =
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
