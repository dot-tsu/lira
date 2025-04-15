import DamperFelt from './DamperFelt'
import Octave from './Octave'

interface KeyboardProps {
  octaves?: number
  activeMidiNotes?: number[]
  onClickNote?: VoidFunction
}

const Keyboard: React.FC<KeyboardProps> = ({
  octaves = 2,
  activeMidiNotes = [],
  onClickNote
}) => {
  return (
    <div>
      <DamperFelt />
      <div className='flex items-center justify-center'>
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
