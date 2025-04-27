import type ChordType from '@/lib/types/chord'
import ChordName from './ChordName'
import ChordNoteDetails from './ChordNoteDetails'

const ChordInfo = ({ chord }: { chord?: ChordType | null }) => {
  if (!chord) return null

  return (
    <div className='flex flex-col items-center gap-2'>
      <ChordName chord={chord} />
      {/* <ChordDescription chord={chord} /> */}
      <ChordNoteDetails chord={chord} />
      {/* <ChordUsage chord={chord} /> */}
    </div>
  )
}

export default ChordInfo
