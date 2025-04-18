import { COLOR } from '@/lib/constants/ui'
import type NoteType from '@/lib/types/note'
import { isBlackKey } from '@/lib/utils/music/notes'
import { cva } from 'class-variance-authority'

const noteVariants = cva(
  'flex items-end justify-center rounded-b-lg shadow-md relative pb-4 duration-100 ease-in-out',
  {
    variants: {
      keyType: {
        white:
          'bg-white text-black h-64 w-16 hover:bg-stone-200 hover:shadow-lg',
        black:
          'bg-black text-white h-44 w-10 -mx-5 z-10 hover:bg-zinc-700 hover:shadow-lg'
      },
      isActive: {
        true: '',
        false: ''
      }
    },
    compoundVariants: [
      {
        keyType: 'black',
        isActive: true,
        className: `!bg-${COLOR}-400 hover:!bg-${COLOR}-500 text-black`
      },
      {
        keyType: 'white',
        isActive: true,
        className: `!bg-${COLOR}-200 hover:!bg-${COLOR}-300`
      }
    ],
    defaultVariants: {
      keyType: 'white',
      isActive: false
    }
  }
)

const Note = ({
  note,
  isActive = false,
  onClick
}: {
  note: NoteType
  isActive?: boolean
  onClick?: VoidFunction
}) => {
  const keyType = isBlackKey(note) ? 'black' : 'white'
  return (
    <button
      onClick={() => onClick(note)}
      className={noteVariants({ keyType, isActive })}
    >
      <span className='text-base'>{note.letter}</span>
      <small className='text-sm'>{note.accidental}</small>
      {/* <span className='absolute bottom-3 text-sm text-gray-600'>
        {note.octave}
      </span> */}
    </button>
  )
}

export default Note
