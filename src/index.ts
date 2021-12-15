import {
  tsCycleEnvToPSCycleEnv,
  psCycleEnvToTSCycleEnv,
  tsCycleToPSCycle,
  psCycleToTSCycle,
} from './ps';
import { Cycle, Maybe, NonEmptyArray, Note, TimeIs } from './types';

const s2c = (s: string): Cycle<Maybe<Note<void>>> => ({
  type: 'singleNote',
  value: {
    val: {
      sampleFoT: s,
      forward: true,
      rateFoT: (_: TimeIs<void>) => 1.0,
      bufferOffsetFoT: (_: TimeIs<void>) => 0.0,
      volumeFoT: (_: TimeIs<void>) => 1.0,
    },
    env: { weight: 1.0 },
  },
});

const i = <V>(nel: NonEmptyArray<Cycle<V>>): Cycle<V> => ({
  type: 'internal',
  value: {
    nel,
    env: { weight: 1.0 },
  },
});

const b = <V>(nel: NonEmptyArray<Cycle<V>>): Cycle<V> => ({
  type: 'branching',
  value: {
    nel,
    env: { weight: 1.0 },
  },
});

const x = <V>(nel: NonEmptyArray<Cycle<V>>): Cycle<V> => ({
  type: 'simultaneous',
  value: {
    nel,
    env: { weight: 1.0 },
  },
});

export {
  tsCycleEnvToPSCycleEnv,
  psCycleEnvToTSCycleEnv,
  tsCycleToPSCycle,
  psCycleToTSCycle,
  s2c,
  i,
  b,
  x,
};
