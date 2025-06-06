import type Chord from '@/lib/types/chord'
import type Note from '@/lib/types/note'
import type {
  ChordQuality,
  ChordExtension,
  ChordSymbolParts,
  ChordSymbol
} from '@/lib/types/chord'
import { getMidiNoteInfo } from '@/lib/utils/music/notes'
import {
  getIntervalBetweenNotes,
  createInterval
} from '@/lib/utils/music/intervals'
import { INTERVALS, QUALITIES, EXTENSION_INTERVALS, CHORD_DESCRIPTIONS } from '@/lib/constants/music'
import { findChordQualityByName } from './scales'

function generateChordSymbol(
  root: Note,
  quality: ChordQuality,
  extension?: ChordExtension,
  suspended?: number,
  added: number[] = []
): ChordSymbol {
  const parts: ChordSymbolParts = {
    root: root.letter + (root.accidental ?? '')
  }

  let fullSymbol = parts.root

  if (quality.notation) {
    parts.quality = quality.notation
    fullSymbol += quality.notation
  }

  if (extension) {
    const extNum = parseInt(extension, 10)
    if (quality.quality === 'Major' && extNum >= 7) {
      parts.extension = `maj${extension}`
      fullSymbol += `maj${extension}`
    } else {
      parts.extension = extension
      fullSymbol += extension
    }
  }

  if (suspended) {
    parts.suspension = `sus${suspended}`
    fullSymbol += `sus${suspended}`
  }

  const uniqueAdded = added
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a - b);

  if (uniqueAdded.length > 0) {
    const addedString = `add${uniqueAdded.join(',')}`
    parts.added = addedString
    fullSymbol += addedString
  }

  return { full: fullSymbol, parts }
}

/**
 * Identifies a chord from a collection of notes
 */
export function identifyChord(notes: Note[]): Chord | null {
  if (notes.length < 3) return null

  notes.sort((a, b) => a.midiNumber - b.midiNumber)

  for (const root of notes) {
    const intervals = notes
      .map((note) => getIntervalBetweenNotes(root, note))
      .sort((a, b) => a.semitones - b.semitones)

    const semitoneValues = intervals.map((interval) => interval.semitones)

    for (const chordQuality of QUALITIES) {
      const pattern = INTERVALS[chordQuality.quality]
      if (semitoneValues.join(',') === pattern.join(',')) {
        const extension = identifyExtension(
          semitoneValues,
          chordQuality
        )
        return generateChord(root, chordQuality.quality, { extension })
      }
    }
  }

  return null
}

/**
 * Identifies chord extension from intervals
 */
function identifyExtension(
  intervals: number[],
  quality: ChordQuality
): ChordExtension | undefined {
  const maxInterval = Math.max(...intervals)

  if (maxInterval >= EXTENSION_INTERVALS['13']) return '13'
  if (maxInterval >= EXTENSION_INTERVALS['11']) return '11'
  if (maxInterval >= EXTENSION_INTERVALS['9']) return '9'
  if (maxInterval >= EXTENSION_INTERVALS['7'][quality.quality]) return '7'

  return undefined
}

function findChordDescription(
  qualityName: ChordQuality['quality'],
  extension?: ChordExtension,
  added: number[] = [],
  suspended?: number
): string | undefined {
  const matchesQuality = (desc: typeof CHORD_DESCRIPTIONS[number]) =>
    desc.quality === qualityName

  const matchesExtension = (desc: typeof CHORD_DESCRIPTIONS[number]) =>
    desc.extension === extension

  const matchesAdded = (desc: typeof CHORD_DESCRIPTIONS[number]) =>
    !desc.added || (added.length === 1 && desc.added === added[0])

  const matchesSuspended = (desc: typeof CHORD_DESCRIPTIONS[number]) =>
    desc.suspended === suspended

  return CHORD_DESCRIPTIONS.find(desc =>
    matchesQuality(desc) &&
    matchesExtension(desc) &&
    matchesAdded(desc) &&
    matchesSuspended(desc)
  )?.description
}

/**
 * Generates a chord based on root note, quality, and optional parameters
 */
export function generateChord(
  root: Note,
  qualityName: ChordQuality['quality'],
  params: {
    extension?: ChordExtension
    added?: number[]
    suspended?: number
    inversion?: number
  } = {}
): Chord {
  const { extension, added = [], suspended, inversion = 0 } = params
  const quality = findChordQualityByName(qualityName)

  if (!quality) {
    throw new Error(`Invalid chord quality: ${qualityName}`)
  }

  let intervals: number[] = [...INTERVALS[qualityName]]
  if (suspended) {
    intervals[1] = suspended === 2 ? 2 : 5
  }

  if (extension) {
    const extNum = parseInt(extension, 10)
    if (extNum >= 7) {
      intervals.push(EXTENSION_INTERVALS['7'][qualityName])
    }
    if (extNum >= 9) {
      intervals.push(EXTENSION_INTERVALS['9'])
    }
    if (extNum >= 11) {
      intervals.push(EXTENSION_INTERVALS['11'])
    }
    if (extNum >= 13) {
      intervals.push(EXTENSION_INTERVALS['13'])
    }
  }

  added.forEach((add) => {
    switch (add) {
      case 9:
        intervals.push(EXTENSION_INTERVALS['9'])
        break
      case 11:
        intervals.push(EXTENSION_INTERVALS['11'])
        break
      case 13:
        intervals.push(EXTENSION_INTERVALS['13'])
        break
      default:
        intervals.push(add)
    }
  })

  intervals = [...new Set(intervals)].sort((a, b) => a - b)

  let notes = intervals.map((interval) =>
    getMidiNoteInfo(root.midiNumber + interval)
  )

  if (inversion > 0 && inversion < notes.length) {
    const notesToInvert = notes.slice(0, inversion)
    const remainingNotes = notes.slice(inversion)

    const invertedNotes = notesToInvert.map((note) =>
      getMidiNoteInfo(note.midiNumber + 12)
    )

    notes = [...remainingNotes, ...invertedNotes]
  }

  const symbol = generateChordSymbol(root, quality, extension, suspended, added)
  const description = findChordDescription(qualityName, extension, added, suspended)

  return {
    root,
    quality,
    extension,
    added,
    suspended,
    inversion,
    notes,
    intervals: intervals.map(createInterval),
    symbol,
    description
  }
}

export function getBassNote(chord: Chord): Note | null {
  if (!chord.notes?.length || chord.inversion === 0) {
    return null
  }

  const bassNote = chord.notes[0]
  if (!bassNote) {
    return null
  }

  if (bassNote.midiNumber === chord.root.midiNumber) {
    return null
  }

  return bassNote
}
