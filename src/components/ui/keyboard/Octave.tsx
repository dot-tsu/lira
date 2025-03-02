import { generateScale } from '@/lib/utils/music/scales'
import Note from './Note'
import type NoteType from '@/lib/types/note'
import { getMidiNoteInfo } from '@/lib/utils/music/notes'

type OctaveProps = {
  activeNotes?: string[]
  octaveNumber?: number
}

const Octave = ({
  activeNotes = [],
  octaveNumber = 1,
}: OctaveProps ) => {
  const C = getMidiNoteInfo(12 * octaveNumber)
  const chromaticScale = generateScale(C, 'chromatic')

  return (
      <div className="flex relative">
        {chromaticScale.notes.map((note: NoteType) => {
          const noteString = `${note.letter}${note.accidental ?? ''}`
          const isActive = activeNotes.includes(noteString)

          return <Note key={noteString} note={note} isActive={isActive} />
        })}
      </div>
  )
}

export default Octave
