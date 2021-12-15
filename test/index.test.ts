import { tsCycleToPSCycle, psCycleToTSCycle, s2c, i, b, x } from '../src';
import { Cycle, Maybe, Note } from '../src/types';

describe('ts cycle to ps cycle', () => {
  it('does a simple two way conversion with 0 loss', () => {
    const cycle: Cycle<Maybe<Note<void>>> = i([s2c('a')]);
    expect(psCycleToTSCycle(tsCycleToPSCycle(cycle))).toEqual(cycle);
  });
  it('does a more involved two way conversion with 0 loss', () => {
    const cycle: Cycle<Maybe<Note<void>>> = i([
      s2c('a'),
      b([s2c('a'), x([s2c('b')]), s2c('c')]),
      s2c('c'),
    ]);
    expect(psCycleToTSCycle(tsCycleToPSCycle(cycle))).toEqual(cycle);
  });
});
