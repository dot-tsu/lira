/**
 * Valid musical note letters from A to G.
 */
export type NoteLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

/**
 * Valid musical accidentals including double flat (bb) to double sharp (##).
 */
export type Accidental = 'bb' | 'b' | '♮' | '#' | '##' | null;

/**
 * Represents a musical note with its fundamental properties.
 * @example
 * const middleC: Note = {
 *   letter: 'C',
 *   accidental: null,
 *   octave: 4,
 *   midiNumber: 60,
 *   frequency: 261.63
 * };
 */
export default interface Note {
    /** The letter name of the note */
    letter: NoteLetter;
    
    /** 
     * The accidental modifier of the note:
     * - 'bb': double flat
     * - 'b': flat
     * - '♮': natural
     * - '#': sharp
     * - '##': double sharp
     */
    accidental: Accidental;
    
    /** 
     * The octave number. Standard notation uses numbers 0-8,
     * where middle C is in octave 4
     */
    octave?: number;
    
    /** 
     * The frequency of the note in Hertz (Hz)
     * e.g., A4 = 440Hz
     */
    frequency?: number;
    
    /** 
     * The MIDI note number (0-127, where middle C is 60)
     * Standard MIDI numbering system
     */
    midiNumber?: number;
    
    /** 
     * Array of enharmonically equivalent notes
     * (notes that sound the same but are written differently)
     * e.g., C# and Db
     */
    enharmonics?: Note[];
}