// ps
export type PSCycle = void & { _: 'PSCycle' };
export type PSCycleEnv = void & { _: 'PSCycleEnv' };
// ts
export type Maybe<A> = A | undefined;
export interface NonEmptyArray<A> extends Array<A> {
  0: A;
}
export type CycleEnv = { weight: number; tag?: string };
export type Cycle<T> =
  | {
      type: 'branching';
      value: { nel: NonEmptyArray<Cycle<T>>; env: CycleEnv };
    }
  | {
      type: 'simultaneous';
      value: { nel: NonEmptyArray<Cycle<T>>; env: CycleEnv };
    }
  | {
      type: 'internal';
      value: { nel: NonEmptyArray<Cycle<T>>; env: CycleEnv };
    }
  | { type: 'singleNote'; value: { val: T; env: CycleEnv } };
export type IsFresh<V> = { isFresh: boolean; value: V };
export type TimeIs<E> = {
  event: IsFresh<E>;
  clockTime: number;
  sampleTime: number;
  bigCycleTime: number;
  littleCycleTime: number;
  normalizedClockTime: number;
  normalizedSampleTime: number;
  normalizedBigCycleTime: number;
  normalizedLittleCycleTime: number;
  littleCycleDuration: number;
  bigCycleDuration: number;
  bufferDuration: number;
  entropy: number;
  initialEntropy: number;
};
export type UnsampledTimeIs<E> = {
  event: IsFresh<E>;
  clockTime: number;
  bigCycleTime: number;
  littleCycleTime: number;
  normalizedClockTime: number;
  normalizedBigCycleTime: number;
  normalizedLittleCycleTime: number;
  littleCycleDuration: number;
  bigCycleDuration: number;
  entropy: number;
  initialEntropy: number;
};
export type FoT<E> = (timeIs: TimeIs<E>) => number;
export type Note<E> = {
  sampleFoT: ((unsampledTimeIs: UnsampledTimeIs<E>) => string) | string;
  forward: boolean;
  rateFoT: FoT<E>;
  bufferOffsetFoT: FoT<E>;
  volumeFoT: FoT<E>;
};
