
import type { ChordQuality } from "../types/chord"
import type Interval from "../types/interval"
import type NoteType from "../types/note"

// Define all possible spellings for each MIDI note number
export const MIDI_TO_NOTES: Record<number, NoteType[]> = {
  0: [
    { letter: "C", accidental: null, midiNumber: 0 },
    { letter: "B", accidental: "#", midiNumber: 0 },
  ],
  1: [
    { letter: "C", accidental: "#", midiNumber: 1 },
    { letter: "D", accidental: "b", midiNumber: 1 },
  ],
  2: [
    { letter: "D", accidental: null, midiNumber: 2 },
    { letter: "C", accidental: "##", midiNumber: 2 },
  ],
  3: [
    { letter: "D", accidental: "#", midiNumber: 3 },
    { letter: "E", accidental: "b", midiNumber: 3 },
  ],
  4: [
    { letter: "E", accidental: null, midiNumber: 4 },
    { letter: "F", accidental: "b", midiNumber: 4 },
    { letter: "D", accidental: "##", midiNumber: 4 },
  ],
  5: [
    { letter: "F", accidental: null, midiNumber: 5 },
    { letter: "E", accidental: "#", midiNumber: 5 },
  ],
  6: [
    { letter: "F", accidental: "#", midiNumber: 6 },
    { letter: "G", accidental: "b", midiNumber: 6 },
  ],
  7: [
    { letter: "G", accidental: null, midiNumber: 7 },
    { letter: "F", accidental: "##", midiNumber: 7 },
  ],
  8: [
    { letter: "G", accidental: "#", midiNumber: 8 },
    { letter: "A", accidental: "b", midiNumber: 8 },
  ],
  9: [
    { letter: "A", accidental: null, midiNumber: 9 },
    { letter: "G", accidental: "##", midiNumber: 9 },
  ],
  10: [
    { letter: "A", accidental: "#", midiNumber: 10 },
    { letter: "B", accidental: "b", midiNumber: 10 },
  ],
  11: [
    { letter: "B", accidental: null, midiNumber: 11 },
    { letter: "C", accidental: "b", midiNumber: 11 },
    { letter: "A", accidental: "##", midiNumber: 11 },
  ],
} as const

// NOTES
export const CONCERT_PITCH = 440
export const CONCERT_PITCH_MIDI = 69

// INTERVALS
export const INTERVAL_MAP: Record<number, Omit<Interval, "note">> = {
  0: {
    name: "Perfect Unison",
    shortName: "P1",
    number: 1,
    quality: "perfect",
    ratio: "1",
    semitones: 0,
  },
  1: {
    name: "Minor Second",
    shortName: "m2",
    number: 2,
    quality: "minor",
    ratio: "16/15",
    semitones: 1,
  },
  2: {
    name: "Major Second",
    shortName: "M2",
    number: 2,
    quality: "major",
    ratio: "9/8",
    semitones: 2,
  },
  3: {
    name: "Minor Third",
    shortName: "m3",
    number: 3,
    quality: "minor",
    ratio: "6/5",
    semitones: 3,
  },
  4: {
    name: "Major Third",
    shortName: "M3",
    number: 3,
    quality: "major",
    ratio: "5/4",
    semitones: 4,
  },
  5: {
    name: "Perfect Fourth",
    shortName: "P4",
    number: 4,
    quality: "perfect",
    ratio: "4/3",
    semitones: 5,
  },
  6: {
    name: "Augmented Fourth",
    shortName: "A4",
    number: 4,
    quality: "augmented",
    ratio: "45/32",
    semitones: 6,
  },
  7: {
    name: "Perfect Fifth",
    shortName: "P5",
    number: 5,
    quality: "perfect",
    ratio: "3/2",
    semitones: 7,
  },
  8: {
    name: "Minor Sixth",
    shortName: "m6",
    number: 6,
    quality: "minor",
    ratio: "8/5",
    semitones: 8,
  },
  9: {
    name: "Major Sixth",
    shortName: "M6",
    number: 6,
    quality: "major",
    ratio: "5/3",
    semitones: 9,
  },
  10: {
    name: "Minor Seventh",
    shortName: "m7",
    number: 7,
    quality: "minor",
    ratio: "9/5",
    semitones: 10,
  },
  11: {
    name: "Major Seventh",
    shortName: "M7",
    number: 7,
    quality: "major",
    ratio: "15/8",
    semitones: 11,
  },
} as const

// CHORDS
export const CHORD_INTERVALS = {
  'Major': [0, 4, 7],
  'Minor': [0, 3, 7],
  'Diminished': [0, 3, 6],
  'Augmented': [0, 4, 8],
  'Half-diminished': [0, 3, 6, 10],
  'Dominant': [0, 4, 7, 10],
} as const

export const EXTENSION_INTERVALS = {
  "7": {
    Major: 11, // Major 7th
    Minor: 10, // Minor 7th
    Diminished: 9, // Diminished 7th
    Augmented: 11, // Major 7th
    "Half-diminished": 10, // Minor 7th
    Dominant: 10, // Minor 7th
  },
  "9": 14, // Major 9th
  "11": 17, // Perfect 11th
  "13": 21, // Major 13th
} as const

// SCALES
export const SCALE_PATTERNS = {
  major: [0, 2, 4, 5, 7, 9, 11],
  "natural minor": [0, 2, 3, 5, 7, 8, 10],
  "harmonic minor": [0, 2, 3, 5, 7, 8, 11],
  "melodic minor": [0, 2, 3, 5, 7, 9, 11],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  "whole tone": [0, 2, 4, 6, 8, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
} as const

// Modal names for the major scale
export const MODES = {
  ionian: SCALE_PATTERNS.major,
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  aeolian: SCALE_PATTERNS["natural minor"],
  locrian: [0, 1, 3, 5, 6, 8, 10],
} as const

export const DIATONIC_CHORD_QUALITIES = {
  major: {
    i: { quality: "Major" },
    ii: { quality: "Minor" },
    iii: { quality: "Minor" },
    iv: { quality: "Major" },
    v: { quality: "Major", extension: "7" },
    vi: { quality: "Minor" },
    vii: { quality: "Diminished" },
  },
  "natural minor": {
    i: { quality: "Minor" },
    ii: { quality: "Diminished" },
    iii: { quality: "Major" },
    iv: { quality: "Minor" },
    v: { quality: "Minor" },
    vi: { quality: "Major" },
    vii: { quality: "Major" },
  },
  "harmonic minor": {
    i: { quality: "Minor" },
    ii: { quality: "Diminished" },
    iii: { quality: "Augmented" },
    iv: { quality: "Minor" },
    v: { quality: "Major", extension: "7" },
    vi: { quality: "Major" },
    vii: { quality: "Diminished" },
  },
} as const


export const CHORD_QUALITIES: ChordQuality[] = [
  { 
  quality: 'Major', 
  notation: null, 
  description: 'Bright and clear.' 
},
{ 
  quality: 'Minor', 
  notation: 'm', 
  description: 'Soft and sad.' 
},
{ 
  quality: 'Diminished', 
  notation: 'dim', 
  description: 'Sharp and tense.' 
},
{ 
  quality: 'Augmented', 
  notation: 'aug', 
  description: 'Odd and unsettled.' 
},
{ 
  quality: 'Half-diminished', 
  notation: 'm7♭5', 
  description: 'Subtle and jazzy.' 
},
{ 
  quality: 'Dominant', 
  notation: '7', 
  description: 'Strong and bluesy.' 
}
] as const

// Suspensions
export const SUSPENSIONS = [
  { value: 2, notation: 'sus2' },
  { value: 4, notation: 'sus4' },
] as const

// Extensions
export const EXTENSIONS = [
  { extension: 'Dominant ninth', notation: '9' },
  { extension: 'Dominant eleventh', notation: '11' },
  { extension: 'Dominant thirteenth', notation: '13' },
] as const

// Added notes
export const ADDED_NOTES = [
  { value: 2, notation: 'add2'},
  { value: 4, notation: 'add4' },
  { value: 6, notation: 'add6' },
  { value: 9, notation: 'add9' },
  { value: 11, notation: 'add11' },
  { value: 13, notation: 'add13' },
] as const
