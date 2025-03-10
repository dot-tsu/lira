import type ChordType from '@/lib/types/chord'
import type Note from '@/lib/types/note'
import QualitySelect from './QualitySelect'
import { generateChord } from '@/lib/utils/music/chords'

const ChordSelector = ({
  root,
  onChordChange
}: {
  root: Note
  onChordChange?: (chord: ChordType) => void
}) => {
  const testChord = generateChord(root, 'dominant', { extension: '7' })
  return (
    <div className='space-y-8'>
      <QualitySelect
        selectedQuality={testChord?.quality}
        onChange={(quality) => {
          console.log(quality)
        }}
      />
      {/* <SuspensionSelect value={suspended} onChange={setSuspended} />
      <ExtensionSelect value={extension} onChange={setExtension} />
      <AddedNotesSelect values={added} onChange={setAdded} /> */}
    </div>
  )
}

export default ChordSelector
