import type Scale from "@/lib/types/scale"
import type Note from "@/lib/types/note"
import { getMidiNoteInfo } from "@/lib/utils/music/notes"
import { generateChord } from "@/lib/utils/music/chords"
import { arraysEqual } from "@/lib/utils"
import { SCALE_PATTERNS, MODES, INTERVAL_MAP, DIATONIC_CHORD_QUALITIES, CHORD_QUALITIES } from "@/lib/constants/music"
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
 * Finds a ChordQuality object from the CHORD_QUALITIES array by quality name
 */
export function findChordQualityByName ( qualityName: string ) {
  return CHORD_QUALITIES.find(quality => quality.quality === qualityName)
}

/**
 * Generates all diatonic chords for a scale
 */
function generateDiatonicChords(
  scaleType: string,
  scaleNotes: Note[]
): Scale['chords'] | null {
  // Only generate chords for scales with defined diatonic harmony
  if (!(scaleType in DIATONIC_CHORD_QUALITIES)) {
    return undefined
  }
  
  const chordQualities = DIATONIC_CHORD_QUALITIES[scaleType as keyof typeof DIATONIC_CHORD_QUALITIES]
  
  // Find the matching ChordQuality objects from CHORD_QUALITIES
  const iQuality = findChordQualityByName(chordQualities.i.quality)
  const iiQuality = findChordQualityByName(chordQualities.ii.quality)
  const iiiQuality = findChordQualityByName(chordQualities.iii.quality)
  const ivQuality = findChordQualityByName(chordQualities.iv.quality)
  const vQuality = findChordQualityByName(chordQualities.v.quality)
  const viQuality = findChordQualityByName(chordQualities.vi.quality)
  const viiQuality = findChordQualityByName(chordQualities.vii.quality)
  
  if (!iQuality || !iiQuality || !iiiQuality || !ivQuality || !vQuality || !viQuality || !viiQuality) {
    return null
  }
  
  // TODO: Fix types
  return {
    i: generateChord(scaleNotes[0], iQuality),
    ii: generateChord(scaleNotes[1], iiQuality),
    iii: generateChord(scaleNotes[2], iiiQuality),
    iv: generateChord(scaleNotes[3], ivQuality),
    v: generateChord(scaleNotes[4], vQuality, {
      extension: 'v' in chordQualities && 'extension' in chordQualities.v ? chordQualities.v.extension : undefined
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
