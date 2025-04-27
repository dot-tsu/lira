import { COLOR } from '@/lib/constants/ui'
import type ChordType from '@/lib/types/chord'
import { Shapes } from 'lucide-react'

const ChordNoteDetails = ({ chord }: { chord: ChordType }) => {
  if (!chord) return null

  const intervalNumbers = chord.intervals?.map(interval => interval.display) || []
  const noteLetters = chord.notes.map(note => note.letter)

  return (
    <div className='flex items-center text-center font-heading text-xl text-neutral-600 text-sm h-8'>
      <Shapes className='mr-2' />
      <span className='min-w-[60px]'>
        {intervalNumbers.join(', ')}
      </span>
      <span className='text-neutral-400 mx-1'>•</span>
      <span className={`text-${COLOR}-500 min-w-[80px]`}>
        ({noteLetters.join(', ')})
      </span>
    </div>
  )
}

export default ChordNoteDetails
