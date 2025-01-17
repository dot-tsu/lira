import type Interval from "@/lib/types/interval"
import type Note from "@/lib/types/note"

/**
 * Basic chord qualities available in music theory.
 * - major: Major triad (1, 3, 5)
 * - minor: Minor triad (1, ♭3, 5)
 * - diminished: Diminished triad (1, ♭3, ♭5)
 * - augmented: Augmented triad (1, 3, #5)
 * - half-diminished: Half-diminished seventh (1, ♭3, ♭5, ♭7)
 * - dominant: Dominant seventh (1, 3, 5, ♭7)
 */
export type ChordQuality = 'major' | 'minor' | 'diminished' | 'augmented' | 'half-diminished' | 'dominant'

/**
 * Available chord extensions beyond the basic triad.
 * - 7: Adds the seventh (major or minor depending on quality)
 * - 9: Includes 7th and adds the 9th (2nd up an octave)
 * - 11: Includes 7th, 9th, and adds the 11th (4th up an octave)
 * - 13: Includes 7th, 9th, 11th, and adds the 13th (6th up an octave)
 */
export type ChordExtension = '7' | '9' | '11' | '13'

/**
 * Represents a musical chord - three or more notes played together.
 * @example
 * const cMajor7: Chord = {
 *   root: { letter: 'C', accidental: null },
 *   quality: 'major',
 *   extension: '7',
 *   inversion: 0,
 *   notes: [C, E, G, B],
 *   symbol: 'Cmaj7'
 * }
 */
export default interface Chord {
    /** The root note of the chord */
    root: Note
    
    /** Basic quality of the chord */
    quality: ChordQuality
    
    /** Extension beyond the basic triad */
    extension?: ChordExtension
    
    /** 
     * Additional notes beyond the basic chord structure
     * @example [9, 11, 13] for extended chords 
     */
    added?: number[]
    
    /** 
     * Indicates if the chord is suspended
     * @example 2 for sus2, 4 for sus4
     */
    suspended?: number
    
    /** 
     * Inversion number:
     * - 0: root position
     * - 1: first inversion
     * - 2: second inversion
     * - 3: third inversion (seventh chords only)
     */
    inversion: number
    
    /** All notes in the chord, in order from lowest to highest */
    notes: Note[]
    
    /** Intervals relative to the root */
    intervals: Interval[]
    
    /** 
     * Chord symbol notation
     * @example "Cmaj7", "Dm9", "G7sus4"
     */
    symbol: string
}