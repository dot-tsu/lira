import type Note from "@/lib/types/note"

// Define all possible spellings for each MIDI note number
export const MIDI_TO_NOTES: Record<number, Note[]> = {
    0: [
        { letter: 'C', accidental: null },
        { letter: 'B', accidental: '#' }
    ],
    1: [
        { letter: 'C', accidental: '#' },
        { letter: 'D', accidental: 'b' }
    ],
    2: [
        { letter: 'D', accidental: null },
        { letter: 'C', accidental: '##' }
    ],
    3: [
        { letter: 'D', accidental: '#' },
        { letter: 'E', accidental: 'b' }
    ],
    4: [
        { letter: 'E', accidental: null },
        { letter: 'F', accidental: 'b' },
        { letter: 'D', accidental: '##' }
    ],
    5: [
        { letter: 'F', accidental: null },
        { letter: 'E', accidental: '#' }
    ],
    6: [
        { letter: 'F', accidental: '#' },
        { letter: 'G', accidental: 'b' }
    ],
    7: [
        { letter: 'G', accidental: null },
        { letter: 'F', accidental: '##' }
    ],
    8: [
        { letter: 'G', accidental: '#' },
        { letter: 'A', accidental: 'b' }
    ],
    9: [
        { letter: 'A', accidental: null },
        { letter: 'G', accidental: '##' }
    ],
    10: [
        { letter: 'A', accidental: '#' },
        { letter: 'B', accidental: 'b' }
    ],
    11: [
        { letter: 'B', accidental: null },
        { letter: 'C', accidental: 'b' },
        { letter: 'A', accidental: '##' }
    ]
}

export const CONCERT_PITCH = 440
export const CONCERT_PITCH_MIDI = 69