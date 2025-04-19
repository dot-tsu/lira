import type ChordType from '@/lib/types/chord'
import type { ChordExtension, ChordQuality } from '@/lib/types/chord'

export interface ChordUIValidationState {
  disableQualitySelect: boolean
  disableSuspensionSelect: boolean
  disabledExtensionValues: ChordExtension[]
  disabledAddedNoteValues: number[]
  disabledQualityValues: ChordQuality['quality'][]
}

const QUALITIES_INCOMPATIBLE_WITH_SUSPENSION: ChordQuality['quality'][] = [
  'Minor',
  'Diminished',
  'Augmented',
  'Half-diminished'
]

export function getChordUIValidationState(
  chord: Pick<ChordType, 'quality' | 'suspended' | 'extension' | 'added'>
): ChordUIValidationState {
  const { quality, suspended, added = [] } = chord
  const qualityName = quality?.quality

  const state: ChordUIValidationState = {
    disableQualitySelect: suspended != null,
    disableSuspensionSelect: Boolean(qualityName && QUALITIES_INCOMPATIBLE_WITH_SUSPENSION.includes(qualityName)),
    disabledExtensionValues: [],
    disabledAddedNoteValues: [],
    disabledQualityValues: []
  }

  if (qualityName === 'Diminished' || qualityName === 'Augmented') {
    state.disabledAddedNoteValues.push(...[11, 13, 6])
  }

  if (qualityName === 'Dominant') {
    state.disabledAddedNoteValues.push(...[9, 11, 13])
  }

  return state
}
