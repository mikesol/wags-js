module PSBindings
  ( tsCycleEnvToPSCycleEnv
  , tsCycleToPSCycle
  , psCycleEnvToTSCycleEnv
  , psCycleToTSCycle
  ) where

import Prelude

import Data.Array as A
import Data.Array.NonEmpty (fromNonEmpty, toNonEmpty)
import Data.Array.NonEmpty.Internal (NonEmptyArray)
import Data.List as L
import Data.List.Types (NonEmptyList(..))
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (unwrap, wrap)
import Data.NonEmpty ((:|))
import Data.Variant (inj, match)
import Type.Proxy (Proxy(..))
import Types (TSCycle, TSCycleEnv)
import WAGS.Graph.Parameter (Maybe', _just, _nothing)
import WAGS.Lib.Tidal.Cycle (Cycle(..), CycleEnv)

foreign import tsCycleEnvToPSCycleEnv_ :: (String -> Maybe String) -> Maybe String -> TSCycleEnv -> CycleEnv

foreign import psCycleEnvToTSCycleEnv :: Number -> Maybe' String -> TSCycleEnv

tsCycleEnvToPSCycleEnv :: TSCycleEnv -> CycleEnv
tsCycleEnvToPSCycleEnv = tsCycleEnvToPSCycleEnv_ Just Nothing

tsCycleToPSCycle :: TSCycle ~> Cycle
tsCycleToPSCycle = tsCycleToPSCycle_ identity

tsCycleToPSCycle_ :: forall a b. (a -> b) -> TSCycle a -> Cycle b
tsCycleToPSCycle_ f = go <<< unwrap
  where
  go = match
    { branching: \{ nel, env } -> Branching $ step nel env
    , simultaneous: \{ nel, env } -> Simultaneous $ step nel env
    , internal: \{ nel, env } -> Internal $ step nel env
    , singleNote: \{ val, env } -> SingleNote
        { val: f val
        , env: tsCycleEnvToPSCycleEnv env
        }
    }

  nea2nel :: NonEmptyArray ~> NonEmptyList
  nea2nel arr =
    let
      a :| b = toNonEmpty arr
    in
      NonEmptyList (a :| L.fromFoldable b)

  step arr env =
    { nel: map (go <<< unwrap) (nea2nel arr)
    , env: tsCycleEnvToPSCycleEnv env
    }

psCycleToTSCycle :: Cycle ~> TSCycle
psCycleToTSCycle = psCycleToTSCycle_ identity

psCycleToTSCycle_ :: forall a b. (a -> b) -> Cycle a -> TSCycle b
psCycleToTSCycle_ f = go
  where
  go (Branching { nel, env }) = wrap $ inj (Proxy :: _ "branching") $ step nel env
  go (Simultaneous { nel, env }) = wrap $ inj (Proxy :: _ "simultaneous") $ step nel env
  go (Internal { nel, env }) = wrap $ inj (Proxy :: _ "internal") $ step nel env
  go (SingleNote { val, env }) = wrap $ inj (Proxy :: _ "singleNote")
    { val: f val
    , env: psCycleEnvToTSCycleEnv env.weight
        (maybe _nothing _just env.tag)
    }

  nel2nea :: NonEmptyList ~> NonEmptyArray
  nel2nea arr =
    let
      a :| b = unwrap arr
    in
      fromNonEmpty (a :| A.fromFoldable b)

  step arr env =
    { nel: map go (nel2nea arr)
    , env: psCycleEnvToTSCycleEnv env.weight
        (maybe _nothing _just env.tag)
    }