// utility
export type Maybe<A> = { type: 'just'; value: A } | { type: 'nothing' };
export type Either<A, B> =
  | { type: 'left'; value: A }
  | { type: 'right'; value: B };

export interface NonEmptyArray<A> extends Array<A> {
  0: A;
}

export type IsFresh<Val> = { isFresh: boolean; value: Val };

export type ForwardBackwards = { forward: AudioBuffer; backwards: AudioBuffer };

export type BufferUrl = string;

export type CycleInfo = {
  cycleStartsAt: number;
  bigCycleDuration: number;
  littleCycleDuration: number;
  currentCycle: Int;
  bigStartsAt: number;
  littleStartsAt: number;
  duration: number;
};

export type EWF<T> = { earth: T; wind: T; fire: T };
export type AH<T> = { air: T; heart: T };

export type TidalRes = EWF<Array<CycleInfo>>;

// give up on this for now
export type NextCycle<Event> = void & { _: 'NextCycle' };

// array with one element
export type Tumultuous = [Array<Instruction>];

export type Globals<Event> = {
  gain: OPast<Event>;
  fx: (clockTimeIs: ClockTimeIs<Event>) => Tumultuous;
};

export type Voice<Event> = { globals: Globals<Event>; next: NextCycle<Event> };

export type TheFuture<Event> = EWF<Voice<Event>> &
  AH<Maybe<DroneNote<Event>>> & {
    sounds: Record<string, BufferUrl>;
    title: string;
    preload: Array<Sample>;
    cycleDuration: CycleDuration;
  };

export type CycleDuration = number;
export type NoteInTime<Note> = {
  note: Note;
  startsAt: number;
  duration: number;
  cycleDuration: number;
  tag: Maybe<string>;
};

export type Int = number;

export type NoteInFlattenedTime<Note> = {
  note: Note;
  bigStartsAt: number;
  littleStartsAt: number;
  currentCycle: Int;
  positionInCycle: Int;
  elementsInCycle: Int;
  nCycles: Int;
  duration: number;
  bigCycleDuration: number;
  littleCycleDuration: number;
  tag: Maybe<string>;
};

export type DroneNote<Event> = {
  sample: Sample;
  forward: boolean;
  rateFoT: OPast<Event>;
  loopStartFoT: OPast<Event>;
  loopEndFoT: OPast<Event>;
  volumeFoT: OPast<Event>;
  tumultFoT: (clockTimeIs: ClockTimeIs<Event>) => Tumultuous;
};

export type Note<Event> = {
  sampleFoT: Either<
    (unsampledTimeIs: UnsampledTimeIs<Event>) => Sample,
    Sample
  >;
  forward: Boolean;
  rateFoT: FoT<Event>;
  bufferOffsetFoT: FoT<Event>;
  volumeFoT: FoT<Event>;
};

export type Sample = string;

export type ClockTimeIs<Event> = {
  clockTime: number;
  event: IsFresh<Event>;
  entropy: number;
};

export type UnsampledTimeIs<Event> = {
  event: IsFresh<Event>;
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

export type TimeIs<Event> = {
  event: IsFresh<Event>;
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

export type TimeIsAndWas<Time> = {
  timeIs: Time;
  valWas: Maybe<number>;
  timeWas: Maybe<Time>;
};

export type OClock<Event> = (clockTimeIs: ClockTimeIs<Event>) => number;

export type OPast<Event> = (
  timeIsAndWas: TimeIsAndWas<ClockTimeIs<Event>>
) => number;

export type FoT<Event> = (timeIs: TimeIs<Event>) => number;

export type FoP<Event> = (timeIsAndWas: TimeIsAndWas<TimeIs<Event>>) => number;

export type Samples<A> = Record<string, A>;

export type CycleEnv = { weight: number; tag: Maybe<string> };

export type Cycles<A> = { cycles: NonEmptyArray<Cycle<A>>; env: CycleEnv };

export type Singleton<A> = { val: A; env: CycleEnv };

export type Cycle<A> =
  | {
      type: 'branching';
      value: Cycles<A>;
    }
  | {
      type: 'simultaneous';
      value: Cycles<A>;
    }
  | {
      type: 'internal';
      value: Cycles<A>;
    }
  | { type: 'singleton'; value: Singleton<A> };

// from wags

type AudioParameterTransition =
  | { type: 'noRamp' }
  | { type: 'linearRamp' }
  | { type: 'exponentialRamp' }
  | { type: 'immediately' };

type AudioParameter_<A> = {
  param: Maybe<A>;
  timeOffset: number;
  transition: AudioParameterTransition;
};

type AudioParameter = AudioParameter_<number>;

type JSON = number | boolean | null | Array<JSON> | { [key: string]: JSON };

type AudioWorkletNodeOptions_ = {
  name: string;
  numberOfInputs: Int;
  numberOfOutputs: Int;
  outputChannelCount: Array<Int>;
  parameterData: Record<string, AudioParameter>;
  processorOptions: Record<string, JSON>;
};

type DisconnectXFromY = {
  fromId: string;
  fromUnit: string;
  toId: string;
  toUnit: string;
};
type DestroyUnit = { id: string; unit: string };
type MakeAllpass = { id: string; freq: AudioParameter; q: AudioParameter };
type MakeAnalyser = {
  id: string;
  cb: (analyserNode: AnalyserNode) => () => () => void;
};
type MakeAudioWorkletNode = { id: string; options: AudioWorkletNodeOptions_ };
type MakeBandpass = { id: string; freq: AudioParameter; q: AudioParameter };
type MakeConstant = { id: string; onOff: APOnOff; offset: AudioParameter };
type MakePassthroughConvolver = { id: string };
type MakeConvolver = { id: string; buffer: AudioBuffer };
type MakeDelay = { id: string; delayTime: AudioParameter };
type MakeDynamicsCompressor = {
  id: string;
  threshold: AudioParameter;
  knee: AudioParameter;
  ratio: AudioParameter;
  attack: AudioParameter;
  release: AudioParameter;
};
type MakeGain = { id: string; gain: AudioParameter };
type MakeHighpass = { id: string; freq: AudioParameter; q: AudioParameter };
type MakeHighshelf = { id: string; freq: AudioParameter; gain: AudioParameter };
type MakeInput = { id: string; input: string };
type MakeLoopBuf = {
  id: string;
  buffer: AudioBuffer;
  onOff: APOnOff;
  playbackRate: AudioParameter;
  loopStart: number;
  loopEnd: number;
};
type MakeLoopBufWithDeferredBuffer = { id: string };
type MakeLowpass = { id: string; freq: AudioParameter; q: AudioParameter };
type MakeLowshelf = { id: string; freq: AudioParameter; gain: AudioParameter };
type MakeMediaElement = { id: string; element: MediaElementAudioSourceNode };
type MakeMicrophone = { microphone: MediaStreamAudioSourceNode };
type MakeNotch = { id: string; freq: AudioParameter; q: AudioParameter };
type MakePeaking = {
  id: string;
  freq: AudioParameter;
  q: AudioParameter;
  gain: AudioParameter;
};
type MakePeriodicOscWithDeferredOsc = { id: string };
type RealImg = { real: Array<number>; img: Array<number> };

type PeriodicOscSpec =
  | { type: 'wave'; value: PeriodicWave }
  | { type: 'realImg'; value: RealImg };

type MakePeriodicOsc = {
  id: string;
  spec: PeriodicOscSpec;
  onOff: APOnOff;
  freq: AudioParameter;
};
type MakePlayBuf = {
  id: string;
  buffer: AudioBuffer;
  bufferOffset: number;
  onOff: APOnOff;
  playbackRate: AudioParameter;
};
type MakePlayBufWithDeferredBuffer = { id: string };
type MakeRecorder = {
  id: string;
  cb: (mediaRecorder: MediaRecorder) => () => void;
};
type MakeSawtoothOsc = { id: string; onOff: APOnOff; freq: AudioParameter };
type MakeSinOsc = { id: string; onOff: APOnOff; freq: AudioParameter };
type MakeSquareOsc = { id: string; onOff: APOnOff; freq: AudioParameter };
type MakeStereoPanner = { id: string; pan: AudioParameter };
type MakeTriangleOsc = { id: string; onOff: APOnOff; freq: AudioParameter };
type MakeWaveShaper = {
  id: string;
  curve: Float32Array;
  oversample: Oversample;
};
type MakeSubgraph = {
  id: string;
  instructions: () => Array<Array<Instruction>>;
};
type MakeSubgraphWithDeferredScene = { id: string };
type MakeTumult = {
  id: string;
  terminus: string;
  instructions: Array<Array<Instruction>>;
};
type MakeTumultWithDeferredGraph = { id: string };
type ConnectXToY = {
  fromId: string;
  fromUnit: string;
  toId: string;
  toUnit: string;
};
type SetAnalyserNodeCb = {
  id: string;
  cb: (analyserNode: AnalyserNode) => () => () => void;
};
type SetMediaRecorderCb = {
  id: string;
  cb: (mediaRecorder: MediaRecorder) => () => void;
};
type SetAudioWorkletParameter = {
  id: string;
  paramName: string;
  paramValue: AudioParameter;
};
type SetBuffer = { id: string; buffer: AudioBuffer };
type SetConvolverBuffer = { id: string; buffer: AudioBuffer };
type SetPeriodicOsc = { id: string; periodicOsc: PeriodicOscSpec };
type SetOnOff = { id: string; onOff: APOnOff };
type SetBufferOffset = { id: string; bufferOffset: number };
type SetLoopStart = { id: string; loopStart: number };
type SetLoopEnd = { id: string; loopEnd: number };
type SetRatio = { id: string; ratio: AudioParameter };
type SetOffset = { id: string; offset: AudioParameter };
type SetAttack = { id: string; attack: AudioParameter };
type SetGain = { id: string; gain: AudioParameter };
type SetQ = { id: string; q: AudioParameter };
type SetPan = { id: string; pan: AudioParameter };
type SetThreshold = { id: string; threshold: AudioParameter };
type SetRelease = { id: string; release: AudioParameter };
type SetKnee = { id: string; knee: AudioParameter };
type SetDelay = { id: string; delay: AudioParameter };
type SetPlaybackRate = { id: string; playbackRate: AudioParameter };
type SetFrequency = { id: string; frequency: AudioParameter };
type SetWaveShaperCurve = { id: string; curve: Float32Array };
type SetInput = { id: string; source: string };
type SetSubgraph = {
  id: string;
  instructions: () => Array<Array<Instruction>>;
};
type SetTumult = {
  id: string;
  terminus: string;
  instructions: Array<Array<Instruction>>;
};

type Instruction =
  | { type: 'disconnectXFromY'; value: DisconnectXFromY }
  | { type: 'destroyUnit'; value: DestroyUnit }
  | { type: 'makeAllpass'; value: MakeAllpass }
  | { type: 'makeAnalyser'; value: MakeAnalyser }
  | { type: 'makeAudioWorkletNode'; value: MakeAudioWorkletNode }
  | { type: 'makeBandpass'; value: MakeBandpass }
  | { type: 'makeConstant'; value: MakeConstant }
  | { type: 'makePassthroughConvolver'; value: MakePassthroughConvolver }
  | { type: 'makeConvolver'; value: MakeConvolver }
  | { type: 'makeDelay'; value: MakeDelay }
  | { type: 'makeDynamicsCompressor'; value: MakeDynamicsCompressor }
  | { type: 'makeGain'; value: MakeGain }
  | { type: 'makeHighpass'; value: MakeHighpass }
  | { type: 'makeHighshelf'; value: MakeHighshelf }
  | { type: 'makeInput'; value: MakeInput }
  | { type: 'makeLoopBuf'; value: MakeLoopBuf }
  | {
      type: 'makeLoopBufWithDeferredBuffer';
      value: MakeLoopBufWithDeferredBuffer;
    }
  | { type: 'makeLowpass'; value: MakeLowpass }
  | { type: 'makeLowshelf'; value: MakeLowshelf }
  | { type: 'makeMediaElement'; value: MakeMediaElement }
  | { type: 'makeMicrophone'; value: MakeMicrophone }
  | { type: 'makeNotch'; value: MakeNotch }
  | { type: 'makePeaking'; value: MakePeaking }
  | {
      type: 'makePeriodicOscWithDeferredOsc';
      value: MakePeriodicOscWithDeferredOsc;
    }
  | { type: 'makePeriodicOsc'; value: MakePeriodicOsc }
  | { type: 'makePlayBuf'; value: MakePlayBuf }
  | {
      type: 'makePlayBufWithDeferredBuffer';
      value: MakePlayBufWithDeferredBuffer;
    }
  | { type: 'makeRecorder'; value: MakeRecorder }
  | { type: 'makeSawtoothOsc'; value: MakeSawtoothOsc }
  | { type: 'makeSinOsc'; value: MakeSinOsc }
  | { type: 'makeSquareOsc'; value: MakeSquareOsc }
  | { type: 'makeSpeaker'; value: void }
  | { type: 'makeStereoPanner'; value: MakeStereoPanner }
  | { type: 'makeTriangleOsc'; value: MakeTriangleOsc }
  | { type: 'makeWaveShaper'; value: MakeWaveShaper }
  | { type: 'makeSubgraph'; value: MakeSubgraph }
  | {
      type: 'makeSubgraphWithDeferredScene';
      value: MakeSubgraphWithDeferredScene;
    }
  | { type: 'makeTumult'; value: MakeTumult }
  | { type: 'makeTumultWithDeferredGraph'; value: MakeTumultWithDeferredGraph }
  | { type: 'connectXToY'; value: ConnectXToY }
  | { type: 'setAnalyserNodeCb'; value: SetAnalyserNodeCb }
  | { type: 'setMediaRecorderCb'; value: SetMediaRecorderCb }
  | { type: 'setAudioWorkletParameter'; value: SetAudioWorkletParameter }
  | { type: 'setBuffer'; value: SetBuffer }
  | { type: 'setConvolverBuffer'; value: SetConvolverBuffer }
  | { type: 'setPeriodicOsc'; value: SetPeriodicOsc }
  | { type: 'setOnOff'; value: SetOnOff }
  | { type: 'setBufferOffset'; value: SetBufferOffset }
  | { type: 'setLoopStart'; value: SetLoopStart }
  | { type: 'setLoopEnd'; value: SetLoopEnd }
  | { type: 'setRatio'; value: SetRatio }
  | { type: 'setOffset'; value: SetOffset }
  | { type: 'setAttack'; value: SetAttack }
  | { type: 'setGain'; value: SetGain }
  | { type: 'setQ'; value: SetQ }
  | { type: 'setPan'; value: SetPan }
  | { type: 'setThreshold'; value: SetThreshold }
  | { type: 'setRelease'; value: SetRelease }
  | { type: 'setKnee'; value: SetKnee }
  | { type: 'setDelay'; value: SetDelay }
  | { type: 'setPlaybackRate'; value: SetPlaybackRate }
  | { type: 'setFrequency'; value: SetFrequency }
  | { type: 'setWaveShaperCurve'; value: SetWaveShaperCurve }
  | { type: 'setInput'; value: SetInput }
  | { type: 'setSubgraph'; value: SetSubgraph }
  | { type: 'setTumult'; value: SetTumult };

type Oversample = { type: 'none' } | { type: 'twoX' } | { type: 'fourX' };

type OnOff = { type: 'on' } | { type: 'off' } | { type: 'offOn' };
type APOnOff = AudioParameter_<OnOff>;
