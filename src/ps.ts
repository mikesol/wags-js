import { PSCycleEnv, CycleEnv, Cycle, PSCycle, Note, PSNote } from "./types"
import P from "./ps_";

const tsCycleEnvToPSCycleEnv: (tsCycleEnv: CycleEnv) => PSCycleEnv = undefined;
const psCycleEnvToTSCycleEnv: (psCycleEnv: PSCycleEnv) => CycleEnv = undefined;
const tsCycleToPSCycle: <E>(tsCycle: Cycle<E>) => PSCycle<E> = undefined
const psCycleToTSCycle: <E>(psCycle: PSCycle<E>) => TsCycle<E> = undefined;
const tsNoteToPSNote: <E>(tsNote: Note<E>) => PSNote<E> = undefined;
const psNoteToTSNote: <E>(psNote: PSNote<E>) => TsNote<E> = undefined;
const parse: <E>(s: string) => PSCycle<PSMaybe<PSNote<E>>> = undefined
const parse_: (s: string) => PSCycle<PSMaybe<PSNote<void>>> = undefined;