import type ChordType from '@/lib/types/chord'
import ChordName from './ChordName'

const ChordInfo = ({ chord }: { chord?: ChordType | null }) => {
  if (!chord) return null

  return (
    <>
      <ChordName chord={chord} />
      {/* <ChordDescription chord={chord} />
      <ChordNoteDetails chord={chord} />
      <ChordUsage chord={chord} /> */}
    </>
  )
}

export default ChordInfo
