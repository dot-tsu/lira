import type Note from "@/lib/types/note"
import type Interval from "@/lib/types/interval"
/**
 * Create an interval object between two notes
 */
export function createInterval(semitones: number): Interval {
  // For intervals beyond one octave, we need to map them to their equivalent within one octave
  const semitonesInOctave = semitones % 12
  const octaves = Math.floor(semitones / 12)

  const intervalMap: Record<number, Interval> = {
    0: { name: "Perfect Unison", shortName: "P1", semitones: 0, ratio: "1/1", quality: "perfect", number: 1, display: "1" },
    1: { name: "Minor Second", shortName: "m2", semitones: 1, ratio: "16/15", quality: "minor", number: 2, display: "b2" },
    2: { name: "Major Second", shortName: "M2", semitones: 2, ratio: "9/8", quality: "major", number: 2, display: "2" },
    3: { name: "Minor Third", shortName: "m3", semitones: 3, ratio: "6/5", quality: "minor", number: 3, display: "b3" },
    4: { name: "Major Third", shortName: "M3", semitones: 4, ratio: "5/4", quality: "major", number: 3, display: "3" },
    5: { name: "Perfect Fourth", shortName: "P4", semitones: 5, ratio: "4/3", quality: "perfect", number: 4, display: "4" },
    6: { name: "Diminished Fifth", shortName: "d5", semitones: 6, ratio: "45/32", quality: "diminished", number: 5, display: "b5" },
    7: { name: "Perfect Fifth", shortName: "P5", semitones: 7, ratio: "3/2", quality: "perfect", number: 5, display: "5" },
    8: { name: "Minor Sixth", shortName: "m6", semitones: 8, ratio: "8/5", quality: "minor", number: 6, display: "b6" },
    9: { name: "Major Sixth", shortName: "M6", semitones: 9, ratio: "5/3", quality: "major", number: 6, display: "6" },
    10: { name: "Minor Seventh", shortName: "m7", semitones: 10, ratio: "16/9", quality: "minor", number: 7, display: "b7" },
    11: { name: "Major Seventh", shortName: "M7", semitones: 11, ratio: "15/8", quality: "major", number: 7, display: "7" },
    12: { name: "Perfect Octave", shortName: "P8", semitones: 12, ratio: "2/1", quality: "perfect", number: 8, display: "8" }
  };

  const baseInterval = intervalMap[semitonesInOctave]
  if (!baseInterval) return baseInterval

  if (octaves > 0) {
    return {
      ...baseInterval,
      number: baseInterval.number + (octaves * 7),
      display: (baseInterval.number + (octaves * 7)).toString()
    }
  }

  return baseInterval
}

/**
 * Calculate interval between two notes and return the corresponding interval object
 */
export function getIntervalBetweenNotes(note1: Note, note2: Note): Interval {
  const semitones = Math.abs(note2.midiNumber - note1.midiNumber)
  return createInterval(semitones)
}
