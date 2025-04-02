import type ChordType from '@/lib/types/chord'
import QualitySelect from './QualitySelect'
import { generateChord } from '@/lib/utils/music/chords'

const ChordSelector = ({
  chord,
  onChange
}: {
  chord?: ChordType | null
  onChange: (chord: ChordType) => void
}) => {
  return (
    <div className='space-y-8'>
      <QualitySelect
        value={chord?.quality}
        onChange={(value) => {
          const newChord = generateChord(chord.root, value.quality)
          onChange(newChord)
        }}
      />

      {/* <SuspensionSelect
        value={chord.suspended}
        onChange={(suspension) => handleChange({ suspended: suspension })}
      />

      <ExtensionSelect
        value={chord.extension}
        onChange={(extension) => handleChange({ extension })}
      />

      <AddedNotesSelect
        values={chord.added || []}
        onChange={(added) => handleChange({ added })}
      /> */}
    </div>
  )
}

export default ChordSelector
