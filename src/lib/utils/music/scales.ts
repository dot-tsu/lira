import type Scale from '@/lib/types/scale'
import type Note from '@/lib/types/note'
import { getMidiNoteInfo } from '@/lib/utils/music/notes'
import { generateChord } from '@/lib/utils/music/chords'
import { arraysEqual } from '@/lib/utils'
import {
  SCALE_PATTERNS,
  MODES,
  INTERVAL_MAP,
  DIATONIC_QUALITIES,
  QUALITIES
} from '@/lib/constants/music'
/**
 * Generates a scale based on tonic note and scale type
 */
export function generateScale(
  tonic: Note,
  scaleType: keyof typeof SCALE_PATTERNS,
  mode?: keyof typeof MODES
): Scale {
  let intervals = mode ? MODES[mode] : SCALE_PATTERNS[scaleType]

  const notes = intervals.map((interval) => {
    const midiNumber = tonic.midiNumber + interval
    return getMidiNoteInfo(midiNumber)
  })

  const scaleIntervals = intervals.map((interval, index) => ({
    ...INTERVAL_MAP[interval],
    note: notes[index]
  }))

  const chords = generateDiatonicChords(scaleType, notes)

  return {
    tonic,
    type: scaleType,
    mode,
    intervals: scaleIntervals,
    notes,
    chords
  }
}

/**
 * Finds a ChordQuality object from the QUALITIES array by quality name
 */
export function findChordQualityByName(qualityName: string) {
  return QUALITIES.find(({ quality }) => quality === qualityName)
}

/**
 * Generates all diatonic chords for a scale
 */
function generateDiatonicChords(
  scaleType: string,
  scaleNotes: Note[]
): Scale['chords'] | null {
  if (!(scaleType in DIATONIC_QUALITIES)) {
    return undefined
  }

  const chordQualities =
    DIATONIC_QUALITIES[scaleType as keyof typeof DIATONIC_QUALITIES]

  const iQuality = findChordQualityByName(chordQualities.i.quality)
  const iiQuality = findChordQualityByName(chordQualities.ii.quality)
  const iiiQuality = findChordQualityByName(chordQualities.iii.quality)
  const ivQuality = findChordQualityByName(chordQualities.iv.quality)
  const vQuality = findChordQualityByName(chordQualities.v.quality)
  const viQuality = findChordQualityByName(chordQualities.vi.quality)
  const viiQuality = findChordQualityByName(chordQualities.vii.quality)

  if (
    !iQuality ||
    !iiQuality ||
    !iiiQuality ||
    !ivQuality ||
    !vQuality ||
    !viQuality ||
    !viiQuality
  ) {
    return null
  }

  // TODO: Fix types
  return {
    i: generateChord(scaleNotes[0], iQuality),
    ii: generateChord(scaleNotes[1], iiQuality),
    iii: generateChord(scaleNotes[2], iiiQuality),
    iv: generateChord(scaleNotes[3], ivQuality),
    v: generateChord(scaleNotes[4], vQuality, {
      extension:
        'v' in chordQualities && 'extension' in chordQualities.v
          ? chordQualities.v.extension
          : undefined
    }),
    vi: generateChord(scaleNotes[5], viQuality),
    vii: generateChord(scaleNotes[6], viiQuality)
  }
}

/**
 * Returns all possible modes for a given scale
 */
export function getScaleModes(scale: Scale): Scale[] {
  if (scale.type !== 'major' && scale.type !== 'natural minor') {
    return [scale]
  }
  return Object.keys(MODES).map((mode, index) => {
    const modeTonicMidi = scale.tonic.midiNumber + SCALE_PATTERNS.major[index]
    const modeTonic = getMidiNoteInfo(modeTonicMidi)
    return generateScale(modeTonic, 'major', mode as keyof typeof MODES)
  })
}

/**
 * Identifies a scale from a collection of notes
 */
export function identifyScale(notes: Note[]): Scale | null {
  const normalizedIntervals = notes
    .map((note) => note.midiNumber % 12)
    .sort((a, b) => a - b)

  for (const [scaleType, pattern] of Object.entries(SCALE_PATTERNS)) {
    const normalizedPattern = pattern.map((interval) => interval % 12)
    if (arraysEqual(normalizedIntervals, normalizedPattern)) {
      return generateScale(notes[0], scaleType as keyof typeof SCALE_PATTERNS)
    }
  }
  return null
}
