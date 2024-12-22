import Chord from "@/lib/types/chord"
import Interval from "@/lib/types/interval"
import Note from "@/lib/types/note"


/**
 * Represents a musical scale - a sequence of notes in ascending or descending order.
 * @example
 * const cMajor: Scale = {
 *   tonic: { letter: 'C', accidental: null },
 *   type: "major",
 *   notes: [C, D, E, F, G, A, B]
 * };
 */
export default interface Scale {
  /** The root note or tonic of the scale */
  tonic: Note;
  
  /** 
   * The type of scale
   * @example "major", "natural minor", "harmonic minor"
   */
  type: string;
  
  /** 
   * The mode of the scale
   * @example "ionian", "dorian", "phrygian"
   */
  mode?: string;
  
  /** Intervals that define the scale */
  intervals: Interval[];
  
  /** All notes in the scale */
  notes: Note[];
  
  /** 
   * Diatonic chords built on each scale degree
   * Using lowercase Roman numerals for traditional notation
   */
  chords?: {
      /** Tonic chord (first degree) */
      i: Chord;
      /** Supertonic chord (second degree) */
      ii: Chord;
      /** Mediant chord (third degree) */
      iii: Chord;
      /** Subdominant chord (fourth degree) */
      iv: Chord;
      /** Dominant chord (fifth degree) */
      v: Chord;
      /** Submediant chord (sixth degree) */
      vi: Chord;
      /** Leading tone/Subtonic chord (seventh degree) */
      vii: Chord;
  };
}