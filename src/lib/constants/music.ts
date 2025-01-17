import type Note from "@/lib/types/note"

// Define all possible spellings for each MIDI note number
export const MIDI_TO_NOTES: Record<number, Note[]> = {
    0: [
        { letter: 'C', accidental: null, midiNumber: 0 },
        { letter: 'B', accidental: '#', midiNumber: 0 }
    ],
    1: [
        { letter: 'C', accidental: '#', midiNumber: 1 },
        { letter: 'D', accidental: 'b', midiNumber: 1 }
    ],
    2: [
        { letter: 'D', accidental: null, midiNumber: 2 },
        { letter: 'C', accidental: '##', midiNumber: 2 }
    ],
    3: [
        { letter: 'D', accidental: '#', midiNumber: 3 },
        { letter: 'E', accidental: 'b', midiNumber: 3 }
    ],
    4: [
        { letter: 'E', accidental: null, midiNumber: 4 },
        { letter: 'F', accidental: 'b', midiNumber: 4 },
        { letter: 'D', accidental: '##', midiNumber: 4 }
    ],
    5: [
        { letter: 'F', accidental: null, midiNumber: 5 },
        { letter: 'E', accidental: '#', midiNumber: 5 }
    ],
    6: [
        { letter: 'F', accidental: '#', midiNumber: 6 },
        { letter: 'G', accidental: 'b', midiNumber: 6 }
    ],
    7: [
        { letter: 'G', accidental: null, midiNumber: 7 },
        { letter: 'F', accidental: '##', midiNumber: 7 }
    ],
    8: [
        { letter: 'G', accidental: '#', midiNumber: 8 },
        { letter: 'A', accidental: 'b', midiNumber: 8 }
    ],
    9: [
        { letter: 'A', accidental: null, midiNumber: 9 },
        { letter: 'G', accidental: '##', midiNumber: 9 }
    ],
    10: [
        { letter: 'A', accidental: '#', midiNumber: 10 },
        { letter: 'B', accidental: 'b', midiNumber: 10 }
    ],
    11: [
        { letter: 'B', accidental: null, midiNumber: 11 },
        { letter: 'C', accidental: 'b', midiNumber: 11 },
        { letter: 'A', accidental: '##', midiNumber: 11 }
    ]
};

// NOTES
export const CONCERT_PITCH = 440
export const CONCERT_PITCH_MIDI = 69

// CHORDS
export const CHORD_INTERVALS = {
    major:             [0, 4, 7],
    minor:             [0, 3, 7],
    diminished:        [0, 3, 6],
    augmented:         [0, 4, 8],
    'half-diminished': [0, 3, 6, 10],
    dominant:          [0, 4, 7, 10]
}

export const EXTENSION_INTERVALS = {
    '7': {
        major: 11,             // Major 7th
        minor: 10,             // Minor 7th
        diminished: 9,         // Diminished 7th
        augmented: 11,         // Major 7th
        'half-diminished': 10, // Minor 7th
        dominant: 10           // Minor 7th
    },
    '9': 14,  // Major 9th
    '11': 17, // Perfect 11th
    '13': 21  // Major 13th
}

// SCALES
export const SCALE_PATTERNS = {
    "major":          [0, 2, 4, 5, 7, 9, 11],
    "natural minor":  [0, 2, 3, 5, 7, 8, 10],
    "harmonic minor": [0, 2, 3, 5, 7, 8, 11],
    "melodic minor":  [0, 2, 3, 5, 7, 9, 11],
    "pentatonic":     [0, 2, 4, 7, 9],
    "blues":          [0, 3, 5, 6, 7, 10],
    "whole tone":     [0, 2, 4, 6, 8, 10],
    "chromatic":      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}

// Modal names for the major scale
export const MODES = {
    ionian:     SCALE_PATTERNS.major,
    dorian:     [0, 2, 3, 5, 7, 9, 10],
    phrygian:   [0, 1, 3, 5, 7, 8, 10],
    lydian:     [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    aeolian:    SCALE_PATTERNS["natural minor"],
    locrian:    [0, 1, 3, 5, 6, 8, 10]
}
