module PSBindings where

import Prelude

import Data.Array.NonEmpty (NonEmptyArray)
import Data.Profunctor (lcmap)
import Data.Variant.Maybe (Maybe)
import Foreign.Object (Object)
import Data.Array as A
import WAGS.Lib.Tidal.Cycle as C
import WAGS.Lib.Tidal.Tidal as T
import WAGS.Lib.Tidal.Types as TT

b :: forall event. C.Cycle (Maybe (TT.Note event)) -> Array (C.Cycle (Maybe (TT.Note event))) -> C.Cycle (Maybe (TT.Note event))
b = T.b

_b :: forall event. C.Cycle (Maybe (TT.Note event)) -> C.Cycle (Maybe (TT.Note event))
_b = T.b'

b_ :: C.Cycle (Maybe (TT.Note Unit)) -> Array (C.Cycle (Maybe (TT.Note Unit))) -> C.Cycle (Maybe (TT.Note Unit))
b_ = T.b_

x :: forall event. C.Cycle (Maybe (TT.Note event)) -> Array (C.Cycle (Maybe (TT.Note event))) -> C.Cycle (Maybe (TT.Note event))
x = T.x

_x :: forall event. C.Cycle (Maybe (TT.Note event)) -> C.Cycle (Maybe (TT.Note event))
_x = T.x'

x_ :: C.Cycle (Maybe (TT.Note Unit)) -> Array (C.Cycle (Maybe (TT.Note Unit))) -> C.Cycle (Maybe (TT.Note Unit))
x_ = T.x_

i :: forall event. C.Cycle (Maybe (TT.Note event)) -> Array (C.Cycle (Maybe (TT.Note event))) -> C.Cycle (Maybe (TT.Note event))
i = T.i

_i :: forall event. C.Cycle (Maybe (TT.Note event)) -> C.Cycle (Maybe (TT.Note event))
_i = T.i'

i_ :: C.Cycle (Maybe (TT.Note Unit)) -> Array (C.Cycle (Maybe (TT.Note Unit))) -> C.Cycle (Maybe (TT.Note Unit))
i_ = T.i_

betwixt :: Number -> Number -> Number -> Number
betwixt = T.betwixt

c2s :: forall event. C.Cycle (Maybe (TT.Note event)) -> TT.CycleDuration -> NonEmptyArray (NonEmptyArray (TT.NoteInTime (Maybe (TT.Note event))))
c2s = T.c2s

{-
-- uses ClockTime
derivative = T.derivative

-- uses choice
focus = T.focus
-}
impatient :: forall a. TT.NextCycle a -> TT.NextCycle a
impatient = T.impatient

drone :: forall event. String -> Maybe (TT.DroneNote event)
drone = T.drone

changeBufferOffset
  :: forall event
   . (TT.TimeIs' event -> Number)
  -> Maybe (TT.Note event)
  -> Maybe (TT.Note event)
changeBufferOffset = T.changeBufferOffset

changeForward :: forall event. Boolean -> Maybe (TT.Note event) -> Maybe (TT.Note event)
changeForward = T.changeForward

changeRate
  :: forall  event
   . ( TT.TimeIs' event
       -> Number
     )
  -> Maybe (TT.Note event)
  -> Maybe (TT.Note event)

changeRate = T.changeRate

changeSample :: forall event. TT.Sample -> Maybe (TT.Note event) -> Maybe (TT.Note event)
changeSample = T.changeSample

changeVolume
  :: forall event
   . (TT.TimeIs' event -> Number)
  -> Maybe (TT.Note event)
  -> Maybe (TT.Note event)

changeVolume = T.changeVolume

onTag :: forall a. String -> (a -> a) -> C.Cycle a -> C.Cycle a
onTag = T.onTag

_onTag :: forall a. String -> (a -> a) -> C.Cycle a -> C.Cycle a
_onTag = T.onTag'

onTagWithIndex :: forall a. String -> (Int -> a -> a) -> C.Cycle a -> C.Cycle a
onTagWithIndex = T.onTagWithIndex

_onTagWithIndex :: forall a. String -> (Int -> a -> a) -> C.Cycle a -> C.Cycle a
_onTagWithIndex = T.onTagWithIndex'

onTags :: forall a. (Array String -> Boolean) -> (a -> a) -> C.Cycle a -> C.Cycle a
onTags = T.onTags <<< lcmap A.fromFoldable

_onTags :: forall a. (Array String -> Boolean) -> (a -> a) -> C.Cycle a -> C.Cycle a
_onTags = T.onTags <<< lcmap A.fromFoldable

onTagsC :: forall a. (Array String -> Boolean) -> (C.Cycle a -> C.Cycle a) -> C.Cycle a -> C.Cycle a
onTagsC = T.onTagsC <<< lcmap A.fromFoldable

_onTagsC :: forall a. (Array String -> Boolean) -> (C.Cycle a -> C.Cycle a) -> C.Cycle a -> C.Cycle a
_onTagsC = T.onTagsC' <<< lcmap A.fromFoldable

onTagsCWithIndex :: forall a. (Array String -> Boolean) -> (Int -> C.Cycle a -> C.Cycle a) -> C.Cycle a -> C.Cycle a
onTagsCWithIndex = T.onTagsCWithIndex <<< lcmap A.fromFoldable

_onTagsCWithIndex :: forall a. (Array String -> Boolean) -> (Int -> C.Cycle a -> C.Cycle a) -> C.Cycle a -> C.Cycle a
_onTagsCWithIndex = T.onTagsCWithIndex' <<< lcmap A.fromFoldable

onTagsWithIndex :: forall a. (Array String -> Boolean) -> (Int -> a -> a) -> C.Cycle a -> C.Cycle a
onTagsWithIndex = T.onTagsWithIndex <<< lcmap A.fromFoldable

_onTagsWithIndex :: forall a. (Array String -> Boolean) -> (Int -> a -> a) -> C.Cycle a -> C.Cycle a
_onTagsWithIndex = T.onTagsWithIndex' <<< lcmap A.fromFoldable

parse :: forall event. String -> C.Cycle (Maybe (TT.Note event))
parse = T.parse

parse_ :: String -> C.Cycle (Maybe (TT.Note Unit))
parse_ = T.parse_

plainly :: forall a. TT.NextCycle a -> TT.Voice a
plainly = T.plainly

rend :: forall event. C.Cycle (Maybe (TT.Note event)) -> TT.CycleDuration -> TT.NextCycle event
rend = T.rend

rendNit :: forall event. NonEmptyArray (NonEmptyArray (TT.NoteInTime (Maybe (TT.Note event)))) -> TT.NextCycle event
rendNit = T.rendNit

rend_ :: C.Cycle (Maybe (TT.Note Unit)) -> TT.CycleDuration -> TT.NextCycle Unit
rend_ = T.rend_

s2f :: forall event. NonEmptyArray (NonEmptyArray (TT.NoteInTime (Maybe (TT.Note event)))) -> NonEmptyArray (TT.NoteInFlattenedTime (TT.Note event))
s2f = T.s2f

u :: C.Cycle (Maybe (TT.Note Unit)) -> C.Cycle (Maybe (TT.Note Unit))
u = T.u

unrest :: forall event. NonEmptyArray (NonEmptyArray (TT.NoteInTime (Maybe (TT.Note event)))) -> Array (Array (TT.NoteInTime (TT.Note event)))
unrest = T.unrest

sString :: forall event. String -> TT.CycleDuration -> TT.Voice event
sString = T.s

sCycle :: forall event. (C.Cycle (Maybe (TT.Note event))) -> TT.CycleDuration -> TT.Voice event
sCycle = T.s

sNoteGroups :: forall event. (NonEmptyArray (NonEmptyArray (TT.NoteInTime (Maybe (TT.Note event))))) -> TT.CycleDuration -> TT.Voice event
sNoteGroups = T.s

sFNoteGroups :: forall event. (TT.CycleDuration -> NonEmptyArray (NonEmptyArray (TT.NoteInTime (Maybe (TT.Note event))))) -> TT.CycleDuration -> TT.Voice event
sFNoteGroups = T.s

sNoteList :: forall event. (NonEmptyArray (TT.NoteInFlattenedTime (TT.Note event))) -> TT.CycleDuration -> TT.Voice event
sNoteList = T.s

sFNoteList :: forall event. (TT.CycleDuration -> NonEmptyArray (TT.NoteInFlattenedTime (TT.Note event))) -> TT.CycleDuration -> TT.Voice event
sFNoteList = T.s

sNextCycle :: forall event. TT.NextCycle event -> TT.CycleDuration -> TT.Voice event
sNextCycle = T.s

sFNextCycle :: forall event. (TT.CycleDuration -> TT.NextCycle event) -> TT.CycleDuration -> TT.Voice event
sFNextCycle = T.s

sVoice :: forall event. TT.Voice event -> TT.CycleDuration -> TT.Voice event
sVoice = T.s

sFVoice :: forall event. (TT.CycleDuration -> TT.Voice event) -> TT.CycleDuration -> TT.Voice event
sFVoice = T.s

make
  :: forall event
   . Number
  -> { | TT.EWF' (TT.CycleDuration -> TT.Voice event)
         ( TT.AH' (Maybe (TT.DroneNote event))
             ( title :: String
             , sounds :: Object TT.BufferUrl
             , preload :: Array TT.Sample
             )
         )
     }
  -> TT.TheFuture event
make = T.make