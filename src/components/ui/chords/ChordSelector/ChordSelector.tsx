import type Chord from '@/lib/types/chord'
import type Note from '@/lib/types/note'

const ChordSelector = ({
  root,
  onChordChange
}: {
  root: Note
  onChordChange?: (chord: Chord) => void
}) => {
  return <div>{root.letter}</div>
}

export default ChordSelector
