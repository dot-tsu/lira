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

export const CONCERT_PITCH = 440
export const CONCERT_PITCH_MIDI = 69