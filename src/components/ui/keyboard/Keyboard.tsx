import DamperFelt from './DamperFelt'
import Octave from './Octave'
import type NoteType from '@/lib/types/note'
import withOrientationPrompt from './OrientationPrompt'
import type { ComponentType } from 'preact'

interface KeyboardProps {
  octaves?: number
  activeMidiNotes?: number[]
  onClickNote?: (note: NoteType) => void
}

const Keyboard: ComponentType<KeyboardProps> = ({
  octaves = 2,
  activeMidiNotes = [],
  onClickNote
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <DamperFelt />
      <div className='flex items-center justify-center w-full'>
        {Array.from({ length: octaves }, (_, index) => (
          <Octave
            key={index}
            octaveNumber={index}
            activeMidiNotes={activeMidiNotes}
            onClickNote={onClickNote}
          />
        ))}
      </div>
    </div>
  )
}

export default withOrientationPrompt(Keyboard)
