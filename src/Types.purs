module Types where

import Data.Array.NonEmpty (NonEmptyArray)
import Data.Newtype (class Newtype)
import Data.Variant (Variant)

data TSCycleEnv
derive instance Newtype (TSCycle a) _
newtype TSCycle a = TSCycle
  ( Variant
      ( branching ::
          { nel :: NonEmptyArray (TSCycle a)
          , env :: TSCycleEnv
          }
      , simultaneous ::
          { nel :: NonEmptyArray (TSCycle a)
          , env :: TSCycleEnv
          }
      , internal ::
          { nel :: NonEmptyArray (TSCycle a)
          , env :: TSCycleEnv
          }
      , singleNote :: { val :: a, env :: TSCycleEnv }
      )
  )
