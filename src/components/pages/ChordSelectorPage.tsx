import { getMidiNoteInfo } from '@/lib/utils/music/notes'
import ChordInfo from '../ui/chords/ChordInfo/ChordInfo'
import ChordSelector from '../ui/chords/ChordSelector/ChordSelector'
import Keyboard from '../ui/keyboard/Keyboard'
import { generateChord } from '@/lib/utils/music/chords'

const ChordSelectorPage = () => {
  const C1 = getMidiNoteInfo(0)
  const chord = generateChord(C1, 'major', { extension: '7' })
  const chordMidiNotes = chord?.notes.map((note) => note.midiNumber)

  return (
    <div className='min-w-screen min-h-screen flex flex-col items-center gap-5'>
      <ChordInfo chord={chord} />
      <Keyboard activeMidiNotes={chordMidiNotes} />
      <ChordSelector root={C1} onChordChange={(chord) => console.log(chord)} />
    </div>
  )
}

export default ChordSelectorPage
