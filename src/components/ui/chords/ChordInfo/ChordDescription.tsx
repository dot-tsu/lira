import type Chord from '@/lib/types/chord'

const ChordDescription = ({ chord }: { chord: Chord }) => {
  if (!chord.description) return null

  return (
    <div className="text-lg font-heading text-center max-w-md">
      {chord.description}
    </div>
  )
}

export default ChordDescription
