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
import { CHORD_INTERVALS, EXTENSION_INTERVALS } from '@/lib/constants/music'

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

  switch (quality) {
    case 'minor':
      parts.quality = 'm'
      fullSymbol += 'm'
      break
    case 'diminished':
      parts.quality = 'dim'
      fullSymbol += 'dim'
      break
    case 'augmented':
      parts.quality = 'aug'
      fullSymbol += 'aug'
      break
  }

  if (extension) {
    const extNum = parseInt(extension, 10)
    if (quality === 'major' && extNum >= 7) {
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

  const uniqueAdded = [...new Set(added)].sort((a, b) => a - b)
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

  // Sort notes by pitch
  notes.sort((a, b) => a.midiNumber - b.midiNumber)

  // Try each note as potential root
  for (const root of notes) {
    const intervals = notes
      .map((note) => getIntervalBetweenNotes(root, note))
      .sort((a, b) => a.semitones - b.semitones)

    // Extract semitone values
    const semitoneValues = intervals.map((interval) => interval.semitones)

    // Check against known chord patterns
    for (const [quality, pattern] of Object.entries(CHORD_INTERVALS)) {
      if (semitoneValues.join(',') === pattern.join(',')) {
        const extension = identifyExtension(
          semitoneValues,
          quality as ChordQuality
        )
        return generateChord(root, quality as ChordQuality, { extension })
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
  if (maxInterval >= EXTENSION_INTERVALS['7'][quality]) return '7'

  return undefined
}

/**
 * Generates a chord based on root note, quality, and optional parameters
 */
export function generateChord(
  root: Note,
  quality: ChordQuality,
  params: {
    extension?: ChordExtension
    added?: number[]
    suspended?: number
    inversion?: number
  } = {}
): Chord {
  // TODO: Fix types
  const { extension, added = [], suspended, inversion = 0 } = params

  let intervals = [...CHORD_INTERVALS[quality]]

  if (suspended) {
    intervals[1] = suspended === 2 ? 2 : 5
  }

  if (extension) {
    const extNum = parseInt(extension, 10)
    if (extNum >= 7) {
      intervals.push(EXTENSION_INTERVALS['7'][quality])
    }
    if (extNum >= 9) intervals.push(EXTENSION_INTERVALS['9'])
    if (extNum >= 11) intervals.push(EXTENSION_INTERVALS['11'])
    if (extNum >= 13) intervals.push(EXTENSION_INTERVALS['13'])
  }

  intervals.push(...added)
  intervals = [...new Set(intervals)].sort((a, b) => a - b)

  let notes = intervals.map((interval) =>
    getMidiNoteInfo(root.midiNumber + interval)
  )

  if (inversion > 0 && inversion < notes.length) {
    const notesToInvert = notes.slice(0, inversion)
    const remainingNotes = notes.slice(inversion)

    const invertedNotes = notesToInvert.map(note => 
      getMidiNoteInfo(note.midiNumber + 12)
    )

    notes = [...remainingNotes, ...invertedNotes]
  }

  const symbol = generateChordSymbol(root, quality, extension, suspended, added)

  return {
    root,
    quality,
    extension,
    added,
    suspended,
    inversion,
    notes,
    intervals: intervals.map(createInterval),
    symbol
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
