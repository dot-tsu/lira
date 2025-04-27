import DamperFelt from './DamperFelt'
import Octave from './Octave'
import type NoteType from '@/lib/types/note'
import OrientationPrompt from './OrientationPrompt'

interface KeyboardProps {
  octaves?: number
  activeMidiNotes?: number[]
  onClickNote?: (note: NoteType) => void
}

const Keyboard: React.FC<KeyboardProps> = ({
  octaves = 2,
  activeMidiNotes = [],
  onClickNote
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <OrientationPrompt />
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

export default Keyboard
