import type Note from "@/lib/types/note"

/**
 * Calculate interval in semitones between two notes
 */
export function getIntervalBetweenNotes(note1: Note, note2: Note): number { return Math.abs(note2.midiNumber - note1.midiNumber) }
