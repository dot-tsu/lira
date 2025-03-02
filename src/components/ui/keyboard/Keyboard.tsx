import { getMidiNoteInfo } from '@/lib/utils/music/notes';
import DamperFelt from './DamperFelt';
import Octave from './Octave'
interface KeyboardProps {
  octaves?: number;
}

const Keyboard: React.FC<KeyboardProps> = ({ octaves = 2 }) => {
  return (
    <div>
      <DamperFelt />
      <div className="flex items-center justify-center">
        {Array.from({ length: octaves }, (_, index) => (
          <Octave key={index} octaveNumber={index} />
        ))}
      </div>
    </div>
  )
};

export default Keyboard;
