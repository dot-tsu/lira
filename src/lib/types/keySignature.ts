import type Note from "@/lib/types/note"

/**
 * Valid key types in music theory.
 */
export type KeyType = 'major' | 'minor';

/**
 * Represents a key signature in musical notation.
 * @example
 * const cMajor: KeySignature = {
 *   tonic: { letter: 'C', accidental: null },
 *   type: 'major',
 *   sharps: 0,
 *   flats: 0,
 *   accidentals: [],
 *   relativeKey: { ... },
 *   parallelKey: { ... }
 * };
 */
export default interface KeySignature {
    /** The tonic note of the key */
    tonic: Note;
    
    /** Whether the key is major or minor */
    type: KeyType;
    
    /** Number of sharps in the key signature */
    sharps: number;
    
    /** Number of flats in the key signature */
    flats: number;
    
    /** 
     * Notes affected by the key signature
     * Lists all notes that are modified by sharps or flats
     */
    accidentals: Array<{
        /** The note that is modified */
        note: Note;
        /** The accidental applied to the note */
        accidental: 'b' | '#';
    }>;
    
    /** The relative major/minor key */
    relativeKey?: KeySignature;
    
    /** The parallel major/minor key */
    parallelKey?: KeySignature;
}