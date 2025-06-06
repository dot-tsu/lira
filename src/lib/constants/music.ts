import type { ChordExtension, ChordQuality } from "../types/chord"
import type Interval from "../types/interval"
import type NoteType from "../types/note"

export const CONCERT_PITCH = 440
export const CONCERT_PITCH_MIDI = 69

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

export const INTERVALS = {
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

export const MODES = {
  ionian: SCALE_PATTERNS.major,
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  aeolian: SCALE_PATTERNS["natural minor"],
  locrian: [0, 1, 3, 5, 6, 8, 10],
} as const

export const DIATONIC_QUALITIES = {
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


export const QUALITIES: ReadonlyArray<ChordQuality> = [
  { quality: 'Major', notation: null, description: 'Bright and clear' },
  { quality: 'Minor', notation: 'm', description: 'Soft and sad' },
  { quality: 'Diminished', notation: 'dim', description: 'Sharp and tense' },
  { quality: 'Augmented', notation: 'aug', description: 'Odd and unsettled' },
  { quality: 'Half-diminished', notation: 'm7b5', description: 'Subtle and jazzy' },
  { quality: 'Dominant', notation: '7', description: 'Strong and bluesy' }
] as const

export type SuspensionOption = {
  value: number
  notation: string
  description: string
}

export const SUSPENSIONS: ReadonlyArray<SuspensionOption> = [
  { value: 2, notation: 'sus2', description: 'Open and airy' },
  { value: 4, notation: 'sus4', description: 'Tense and unresolved' },
] as const

export type ExtensionOption = {
  value: ChordExtension
  notation: string
  description: string
}

export const EXTENSIONS: ReadonlyArray<ExtensionOption> = [
  { value: '7', notation: 'maj7', description: 'Bluesy and grounded' },
  { value: '9', notation: 'maj9', description: 'Colorful and smooth' },
  { value: '11', notation: 'maj11', description: 'Rich and atmospheric' },
  { value: '13', notation: 'maj13', description: 'Lush and jazzy' },
] as const

export type AddedNoteOption = {
  value: number // The interval number (e.g., 6, 9, 11)
  notation: string // e.g., 'add6', 'add9'
  description: string
}

export const ADDED_NOTES: ReadonlyArray<AddedNoteOption> = [
  { value: 6, notation: 'add6', description: 'Sweet and vintage' },
  { value: 9, notation: 'add9', description: 'Bright and elegant' },
  { value: 11, notation: 'add11', description: 'Dreamy and modern' },
  { value: 13, notation: 'add13', description: 'Warm and colorful' },

] as const

export type ChordDescription = {
  quality: ChordQuality['quality']
  extension?: ChordExtension
  added?: number
  suspended?: number
  description: string
}

export const CHORD_DESCRIPTIONS: ReadonlyArray<ChordDescription> = [
  {
    quality: 'Major',
    description: 'A bright, stable chord that forms the foundation of most music. Often used to create uplifting melodies and harmonies.'
  },
  {
    quality: 'Minor',
    description: 'A melancholic chord that adds emotional depth. Commonly used to express sadness.'
  },
  {
    quality: 'Diminished',
    description: 'A tense, mysterious chord that creates suspense. Often used to add drama or transition between other chords.'
  },
  {
    quality: 'Augmented',
    description: 'A unique, dreamy chord that adds color to your music. Perfect for creating an otherworldly atmosphere.'
  },
  {
    quality: 'Half-diminished',
    description: 'A sophisticated chord that adds a jazzy flavor. Great for creating rich, complex harmonies.'
  },
  {
    quality: 'Dominant',
    description: 'A powerful chord that drives music forward. Essential for creating tension and resolution in progressions.'
  },
  {
    quality: 'Major',
    extension: '7',
    description: 'A dreamy, jazzy chord that adds sophistication to your harmonies. Perfect for creating smooth progressions.'
  },
  {
    quality: 'Major',
    extension: '9',
    description: 'A rich, colorful chord that adds sophistication. Popular in jazz and R&B for its smooth sound.'
  },
  {
    quality: 'Major',
    extension: '11',
    description: 'A dreamy chord that creates atmosphere. Great for adding depth to your harmonies.'
  },
  {
    quality: 'Major',
    extension: '13',
    description: 'A lush, full chord that brings warmth and richness. Perfect for creating rich, complex harmonies.'
  },
  {
    quality: 'Major',
    added: 6,
    description: 'A sweet, nostalgic chord that adds warmth. Popular in pop and jazz for its vintage feel.'
  },
  {
    quality: 'Major',
    added: 9,
    description: 'A bright, fresh chord that adds sparkle. Great for creating modern, uplifting sounds.'
  },
  {
    quality: 'Major',
    added: 11,
    description: 'A dreamy chord that adds atmosphere. Perfect for creating ethereal, floating sounds.'
  },
  {
    quality: 'Major',
    added: 13,
    description: 'A warm, colorful chord that adds richness. Great for creating full, satisfying harmonies.'
  },
  {
    quality: 'Major',
    suspended: 2,
    description: 'An open, airy chord that creates space. Perfect for folk and pop music.'
  },
  {
    quality: 'Major',
    suspended: 4,
    description: 'A floating chord that creates anticipation. Great for building tension in your music.'
  },
  {
    quality: 'Dominant',
    extension: '7',
    suspended: 4,
    description: 'A floating, bluesy chord that combines tension with movement. Perfect for jazz and R&B.'
  }
] as const
