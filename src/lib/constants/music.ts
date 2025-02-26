
import type Interval from "../types/interval"

// Define all possible spellings for each MIDI note number
export const MIDI_TO_NOTES: Record<number, Note[]> = {
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
export const CONCERT_PITCH = 440 as const
export const CONCERT_PITCH_MIDI = 69 as const

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
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  "half-diminished": [0, 3, 6, 10],
  dominant: [0, 4, 7, 10],
} as const

export const EXTENSION_INTERVALS = {
  "7": {
    major: 11, // Major 7th
    minor: 10, // Minor 7th
    diminished: 9, // Diminished 7th
    augmented: 11, // Major 7th
    "half-diminished": 10, // Minor 7th
    dominant: 10, // Minor 7th
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
    i: { quality: "major" },
    ii: { quality: "minor" },
    iii: { quality: "minor" },
    iv: { quality: "major" },
    v: { quality: "major", extension: "7" },
    vi: { quality: "minor" },
    vii: { quality: "diminished" },
  },
  "natural minor": {
    i: { quality: "minor" },
    ii: { quality: "diminished" },
    iii: { quality: "major" },
    iv: { quality: "minor" },
    v: { quality: "minor" },
    vi: { quality: "major" },
    vii: { quality: "major" },
  },
  "harmonic minor": {
    i: { quality: "minor" },
    ii: { quality: "diminished" },
    iii: { quality: "augmented" },
    iv: { quality: "minor" },
    v: { quality: "major", extension: "7" },
    vi: { quality: "major" },
    vii: { quality: "diminished" },
  },
} as const
