import type Scale from "@/lib/types/scale"
import type Note from "@/lib/types/note"
import { getMidiNoteInfo } from "@/lib/utils/music/notes"
import { generateChord } from "@/lib/utils/music/chords"
import { arraysEqual } from "@/lib/utils"
import { SCALE_PATTERNS, MODES, INTERVAL_MAP, DIATONIC_CHORD_QUALITIES } from "@/lib/constants/music"

/**
 * Generates a scale based on tonic note and scale type
 */
export function generateScale(
  tonic: Note,
  scaleType: keyof typeof SCALE_PATTERNS,
  mode?: keyof typeof MODES
): Scale {
  // Get the appropriate interval pattern
  let intervals = mode ? MODES[mode] : SCALE_PATTERNS[scaleType]

  // Generate notes from intervals
  const notes = intervals.map(interval => {
    const midiNumber = tonic.midiNumber + interval
    return getMidiNoteInfo(midiNumber)
  })

  // Generate scale intervals with proper musical names
  const scaleIntervals = intervals.map((interval, index) => ({
    ...INTERVAL_MAP[interval],
    note: notes[index]
  }))

  // Generate diatonic chords if applicable
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
 * Generates all diatonic chords for a scale
 */
function generateDiatonicChords(
  scaleType: string,
  scaleNotes: Note[]
): Scale['chords'] | undefined {
  // Only generate chords for scales with defined diatonic harmony
  if (!(scaleType in DIATONIC_CHORD_QUALITIES)) {
    return undefined
  }

  const chordQualities = DIATONIC_CHORD_QUALITIES[scaleType as keyof typeof DIATONIC_CHORD_QUALITIES]

  return {
    i: generateChord(scaleNotes[0], chordQualities.i.quality),
    ii: generateChord(scaleNotes[1], chordQualities.ii.quality),
    iii: generateChord(scaleNotes[2], chordQualities.iii.quality),
    iv: generateChord(scaleNotes[3], chordQualities.iv.quality),
    v: generateChord(scaleNotes[4], chordQualities.v.quality, {
      extension: 'v' in chordQualities && 'extension' in chordQualities.v ? chordQualities.v.extension : undefined
    }),
    vi: generateChord(scaleNotes[5], chordQualities.vi.quality),
    vii: generateChord(scaleNotes[6], chordQualities.vii.quality)
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
  // Sort notes by pitch and normalize to single octave
  const normalizedIntervals = notes
    .map(note => note.midiNumber % 12)
    .sort((a, b) => a - b)

  // Try to match against known scale patterns
  for (const [scaleType, pattern] of Object.entries(SCALE_PATTERNS)) {
    const normalizedPattern = pattern.map(interval => interval % 12)
    if (arraysEqual(normalizedIntervals, normalizedPattern)) {
      return generateScale(notes[0], scaleType as keyof typeof SCALE_PATTERNS)
    }
  }

  return null
}
