import type Chord from "@/lib/types/chord"
import type Note from "@/lib/types/note"
import type { ChordQuality, ChordExtension, ChordSymbolParts, ChordSymbol } from "@/lib/types/chord"
import { getMidiNoteInfo } from "@/lib/utils/music/notes"
import { getIntervalBetweenNotes, createInterval } from "@/lib/utils/music/intervals"
import { CHORD_INTERVALS, EXTENSION_INTERVALS } from "@/lib/constants/music"


function generateChordSymbol(
  root: Note,
  quality: ChordQuality,
  extension?: ChordExtension,
  suspended?: number,
  added?: number[]
): ChordSymbol {
  const chordParts: ChordSymbolParts = {
    root: root.letter + (root.accidental ? (root.accidental === '#' ? '#' : 'b') : '')
  }

  // Add quality
  switch (quality) {
    case 'minor':
      chordParts.quality = 'm'
      break
    case 'diminished':
      chordParts.quality = 'dim'
      break
    case 'augmented':
      chordParts.quality = 'aug'
      break
    case 'half-diminished':
      chordParts.quality = 'ø'
      break
    // Major and dominant don't need quality indicator
  }

  // Add suspension
  if (suspended) {
    chordParts.suspension = `sus${suspended}`
  }

  // Add extension
  if (extension) {
    chordParts.extension = quality === 'major' && extension === '7' ? 'maj7' : extension
  }

  // Add additional notes
  if (added && added.length > 0) {
    chordParts.added = `add${added.join(',')}`
  }

  // Combine all parts for the complete symbol
  const chordSymbol = [
    chordParts.root,
    chordParts.quality,
    chordParts.suspension,
    chordParts.extension,
    chordParts.added
  ].filter(Boolean).join('')

  return {
    full: chordSymbol,
    parts: chordParts
  }
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
     if (semitoneValues.join(",") === pattern.join(",")) {
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
function identifyExtension(intervals: number[], quality: ChordQuality): ChordExtension | undefined {
  const maxInterval = Math.max(...intervals)

  if (maxInterval >= EXTENSION_INTERVALS['13']) return '13'
  if (maxInterval >= EXTENSION_INTERVALS['11']) return '11'
  if (maxInterval >= EXTENSION_INTERVALS['9'])  return '9'
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
    extension?: ChordExtension,
    added?: number[],
    suspended?: number,
    inversion?: number
  } = {}
): Chord {
  const {
    extension,
    added = [],
    suspended,
    inversion = 0
  } = params

  // Start with basic chord intervals
  let intervals: number[] = [...CHORD_INTERVALS[quality]]

  // Add suspension if specified
  if (suspended) {
    // Replace the third (index 1) with suspended interval
    intervals[1] = suspended === 2 ? 2 : 5
  }

  // Add extension if specified
  if (extension) {
    // Add seventh based on quality
    if (quality in EXTENSION_INTERVALS['7']) {
      intervals.push(EXTENSION_INTERVALS['7'][quality as keyof typeof EXTENSION_INTERVALS['7']])
    }

    // Add additional extensions
    if (extension >= '9') intervals.push(EXTENSION_INTERVALS['9'])
    if (extension >= '11') intervals.push(EXTENSION_INTERVALS['11'])
    if (extension >= '13') intervals.push(EXTENSION_INTERVALS['13'])
  }

  // Add additional notes
  intervals.push(...added)

  // Remove duplicates and sort
  intervals = [...new Set(intervals)].sort((a, b) => a - b)

  // Generate notes from intervals
  let notes = intervals.map(interval => {
    const midiNumber = root.midiNumber + interval
    return getMidiNoteInfo(midiNumber)
  })

  // Apply inversion
  if (inversion > 0) {
    const invertedNotes = notes.slice(inversion)
    const bassNotes = notes.slice(0, inversion).map(note => {
      const midiNumber = note.midiNumber + 12
      return getMidiNoteInfo(midiNumber)
    })
    notes = [...invertedNotes, ...bassNotes]
  }

  // Generate symbol
  const {chordSymbol: symbol, chordParts: symbolParts} = generateChordSymbol(root, quality, extension, suspended, added)

  return {
    root,
    quality,
    extension,
    added,
    suspended,
    inversion,
    notes,
    intervals: intervals.map(interval => 
      createInterval(interval)
    ),
    symbol,
  }
}
