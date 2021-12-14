//data Cycle a
//  = Branching { nel :: NonEmptyList (Cycle a), env :: CycleEnv }
//  | Simultaneous { nel :: NonEmptyList (Cycle a), env :: CycleEnv }
//  | Internal { nel :: NonEmptyList (Cycle a), env :: CycleEnv }
//  | SingleNote { val :: a, env :: CycleEnv }

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
