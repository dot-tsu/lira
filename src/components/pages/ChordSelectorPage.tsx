import ChordInfo from '../ui/chords/ChordInfo/ChordInfo'
import ChordSelector from '../ui/chords/ChordSelector/ChordSelector'
import Keyboard from '../ui/keyboard/Keyboard'
import withChordRootHandling from '@/hocs/withChordRootHandling'
import type ChordType from '@/lib/types/chord'
import type NoteType from '@/lib/types/note'

const ChordSelectorPage = ({
  root,
  chord,
  onRootChange,
  setChord
}: {
  root: NoteType
  chord: ChordType
  onRootChange: (root: NoteType) => void
  setChord: (chord: ChordType) => void
}) => {
  const activeMidiNotes = chord.notes.map((note) => note.midiNumber)

  return (
    <div className='min-w-screen min-h-full flex items-center justify-center '>
      <div className='w-full  flex flex-col items-center justify-center gap-4 p-14'>
        <ChordInfo chord={chord} />
        <Keyboard activeMidiNotes={activeMidiNotes} onClickNote={onRootChange} />
        <ChordSelector chord={chord} onChange={setChord} root={root} />
      </div>
    </div>
  )
}

export default withChordRootHandling(ChordSelectorPage)
