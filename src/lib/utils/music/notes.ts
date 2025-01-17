import { CONCERT_PITCH, CONCERT_PITCH_MIDI, MIDI_TO_NOTES } from "@/lib/constants/music"
import type Note from "@/lib/types/note"

/**
 * Calculates frequency in Hz from MIDI number
 * Using A4 = 440Hz as reference
 */
function getMidiFrequency(midiNumber: number): number {
    return CONCERT_PITCH * Math.pow(2, (midiNumber - CONCERT_PITCH_MIDI) / 12)
}

/**
 * Returns complete note information including all enharmonic equivalents
 */
export function getMidiNoteInfo(midiNumber: number): Note {
    const pitchClass = midiNumber % 12
    const octave = Math.floor(midiNumber / 12) - 1
    const frequency = getMidiFrequency(midiNumber)
    
    const enharmonics: Note[] = MIDI_TO_NOTES[pitchClass].map(noteInfo => ({
        letter: noteInfo.letter,
        accidental: noteInfo.accidental,
        octave,
        frequency,
        midiNumber,
        enharmonics: []
    }))
    
    enharmonics.forEach(note => {
        note.enharmonics = enharmonics
            .filter(n => n !== note)
            .map(n => ({
                letter: n.letter,
                accidental: n.accidental,
                octave: n.octave,
                frequency: n.frequency,
                midiNumber: n.midiNumber,
                enharmonics: []
            }))
    })
    
    return enharmonics[0]
}