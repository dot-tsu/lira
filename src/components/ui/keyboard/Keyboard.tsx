import DamperFelt from './DamperFelt';
import Octave from './Octave'
interface KeyboardProps {
  octaves?: number;
  activeMidiNotes?: number[]
}

const Keyboard: React.FC<KeyboardProps> = ( { octaves = 2, activeMidiNotes = [0, 3, 5, 6, 9, 11, 13, 15] } ) => {
  return (
    <div>
      <DamperFelt />
      <div className="flex items-center justify-center">
        {Array.from({ length: octaves }, (_, index) => (
          <Octave key={index} octaveNumber={index} activeMidiNotes={activeMidiNotes} />
        ))}
      </div>
    </div>
  )
};

export default Keyboard;
