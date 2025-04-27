import { COLOR } from '@/lib/constants/ui'
import type ChordType from '@/lib/types/chord'
import { Shapes } from 'lucide-react'

const ChordNoteDetails = ({ chord }: { chord: ChordType }) => {
  if (!chord) return null

  const intervalNumbers = chord.intervals.map(interval => interval.number)

  const intervalDisplay = intervalNumbers.join(', ')
  const noteLetters = chord.notes.map(note => note.letter + (note.accidental ?? ''))

  return (
    <div className='flex flex-col items-center text-center font-heading text-xl text-neutral-600 text-sm h-8'>
      <div className='flex items-center'>
        <Shapes className='mr-2' />
        <span className='min-w-[60px]'>
          {intervalDisplay}
        </span>
        <span className='text-neutral-400 mx-1'>&bull;</span>
        <span className={`text-${COLOR}-500 min-w-[80px]`}>
          ({noteLetters.join(', ')})
        </span>
      </div>
    </div>
  )
}

export default ChordNoteDetails
