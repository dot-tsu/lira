import { generateScale } from '@/lib/utils/music/scales'
import Note from './Note'
import type NoteType from '@/lib/types/note'
import { getMidiNoteInfo } from '@/lib/utils/music/notes'

type OctaveProps = {
  activeMidiNotes?: number[]
  octaveNumber?: number
  onClickNote?: (note: NoteType) => void
}

const Octave = ({
  activeMidiNotes = [],
  octaveNumber = 1,
  onClickNote
}: OctaveProps) => {
  const C = getMidiNoteInfo(12 * octaveNumber)
  const chromaticScale = generateScale(C, 'chromatic')
  return (
    <div className='flex relative w-full'>
      {chromaticScale.notes.map((note: NoteType) => {
        const noteString = `${note.letter}${note.accidental ?? ''}`
        const isActive = activeMidiNotes.includes(note.midiNumber)
        return (
          <Note
            key={noteString}
            note={note}
            isActive={isActive}
            onClick={onClickNote}
          />
        )
      })}
    </div>
  )
}

export default Octave
