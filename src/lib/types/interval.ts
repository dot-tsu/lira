/**
 * Possible qualities of musical intervals.
 */
export type IntervalQuality = 'diminished' | 'minor' | 'perfect' | 'major' | 'augmented'

/**
 * Represents a musical interval - the distance between two notes.
 * @example
 * const majorThird: Interval = {
 *   name: "Major Third",
 *   shortName: "M3",
 *   semitones: 4,
 *   ratio: 5/4,
 *   quality: "major",
 *   number: 3
 * }
 */
export default interface Interval {
    /** 
     * Full name of the interval
     * @example "Major Third", "Perfect Fifth"
     */
    name: string
    
    /** 
     * Abbreviated name of the interval
     * @example "M3", "P5"
     */
    shortName: string
    
    /** 
     * Number of semitones in the interval
     * @example 4 for major third, 7 for perfect fifth
     */
    semitones: number
    
    /** 
     * Frequency ratio of the interval
     * @example 3/2 for perfect fifth, 5/4 for major third
     */
    ratio: string
    
    /** Quality of the interval */
    quality: IntervalQuality
    
    /** 
     * Diatonic number of the interval
     * @example 2 for second, 3 for third, etc.
     */
    number: number
}