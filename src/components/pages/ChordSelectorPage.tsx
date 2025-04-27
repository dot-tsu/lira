import ChordInfo from '../ui/chords/ChordInfo/ChordInfo'
import ChordSelector from '../ui/chords/ChordSelector/ChordSelector'
import Keyboard from '../ui/keyboard/Keyboard'
import { useState, useEffect } from 'react'
import type ChordType from '@/lib/types/chord'
import { generateChord } from '@/lib/utils/music/chords'
import { getMidiNoteInfo } from '@/lib/utils/music/notes'
import type NoteType from '@/lib/types/note'

const DEFAULT_ROOT = getMidiNoteInfo(0)
const DEFAULT_CHORD = generateChord(DEFAULT_ROOT, 'Major')

const ChordSelectorPage = () => {
  const [root, setRoot] = useState<NoteType>(DEFAULT_ROOT)
  const [chord, setChord] = useState<ChordType>(DEFAULT_CHORD)

  useEffect(() => {
    setChord(generateChord(root, 'Major'))
  }, [root])

  const activeMidiNotes = chord.notes.map((note) => note.midiNumber)

  return (
    <div className='min-w-screen min-h-screen flex flex-col items-center -mt-14 justify-center gap-6 p-4'>
      <ChordInfo chord={chord} />
      <Keyboard activeMidiNotes={activeMidiNotes} onClickNote={setRoot} />
      <ChordSelector chord={chord} onChange={setChord} root={root} />
    </div>
  )
}

export default ChordSelectorPage
