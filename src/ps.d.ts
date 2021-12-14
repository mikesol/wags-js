import { PSCycleEnv, CycleEnv, Cycle, PSCycle } from "./types"

export function tsCycleEnvToPSCycleEnv(tsCycleEnv: CycleEnv): PSCycleEnv;
export function psCycleEnvToTSCycleEnv(psCycleEnv: PSCycleEnv): CycleEnv;
export function tsCycleToPSCycle(tsCycle: Cycle): PSCycle;
export function psCycleToTSCycle(psCycle: PSCycle): tsCycle;
