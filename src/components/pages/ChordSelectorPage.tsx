import ChordInfo from '../ui/chords/ChordInfo/ChordInfo'
import ChordSelector from '../ui/chords/ChordSelector/ChordSelector'
import Keyboard from '../ui/keyboard/Keyboard'
import { useState } from 'react'
import type ChordType from '@/lib/types/chord'
import { generateChord } from '@/lib/utils/music/chords'
import { getMidiNoteInfo } from '@/lib/utils/music/notes'

const DEFAULT_ROOT = getMidiNoteInfo(0)
const DEFAULT_CHORD = generateChord(DEFAULT_ROOT, 'Major')

const ChordSelectorPage = () => {
  const [chord, setChord] = useState<ChordType>(DEFAULT_CHORD)

  const activeMidiNotes = chord?.notes.map((note) => note.midiNumber) ?? []

  return (
    <div className='min-w-screen min-h-screen flex flex-col items-center gap-5 p-4'>
      <ChordInfo chord={chord} />
      <Keyboard activeMidiNotes={activeMidiNotes} />
      <ChordSelector chord={chord} onChange={setChord} />
    </div>
  )
}

export default ChordSelectorPage
