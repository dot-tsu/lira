import { COLOR } from '@/lib/constants/ui'
import type ChordType from '@/lib/types/chord'
import { Shapes } from 'lucide-react'

const ChordNoteDetails = ({ chord }: { chord: ChordType }) => {
  if (!chord) return null

  // Get all interval displays and ensure they're in the correct order
  const intervalNumbers = chord.intervals
    ? chord.intervals
      .map(interval => interval?.display || '')
      .filter(Boolean)
      .sort((a, b) => {
        // Convert to numbers for proper sorting (e.g., "b3" -> 3)
        const numA = parseInt(a.replace('b', ''), 10)
        const numB = parseInt(b.replace('b', ''), 10)
        return numA - numB
      })
    : []

  const intervalDisplay = intervalNumbers.join(', ')
  const noteLetters = chord.notes.map(note => note.letter)
  const colorClass = `text-${COLOR}-500`

  return (
    <div className='flex items-center text-center font-heading text-xl text-neutral-600 text-sm h-8'>
      <Shapes className='mr-2' />
      <span className='min-w-[60px]'>
        {intervalDisplay}
      </span>
      <span className='text-neutral-400 mx-1'>&bull;</span>
      <span className={`${colorClass} min-w-[80px]`}>
        ({noteLetters.join(', ')})
      </span>
    </div>
  )
}

export default ChordNoteDetails
