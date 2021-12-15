import { tsCycleToPSCycle, psCycleToTSCycle } from '../src';
import { Cycle } from '../src/types';

describe('ts cycle to ps cycle', () => {
  it('does a simple two way conversion with 0 loss', () => {
    const cycle: Cycle<string> = {
      type: 'internal',
      value: {
        nel: [
          { type: 'singleNote', value: { val: 'a', env: { weight: 1.0 } } },
        ],
        env: { weight: 1.0 },
      },
    };
    expect(psCycleToTSCycle(tsCycleToPSCycle(cycle))).toEqual(cycle);
  });
  it('does a more involved two way conversion with 0 loss', () => {
    const cycle: Cycle<string> = {
      type: 'internal',
      value: {
        nel: [
          {
            type: 'simultaneous',
            value: {
              nel: [
                {
                  type: 'singleNote',
                  value: { val: 'a', env: { weight: 1.0 } },
                },
              ],
              env: { weight: 1.0 },
            },
          },
          {
            type: 'internal',
            value: {
              nel: [
                {
                  type: 'singleNote',
                  value: { val: 'a', env: { weight: 1.0 } },
                },
              ],
              env: { weight: 1.0 },
            },
          },
        ],
        env: { weight: 1.0 },
      },
    };
    expect(psCycleToTSCycle(tsCycleToPSCycle(cycle))).toEqual(cycle);
  });
});
