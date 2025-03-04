import type ChordType from '@/lib/types/chord'
import type Note from '@/lib/types/note'
import QualitySelect from './QualitySelect'

const COLOR = 'orange'

const ChordSelector = ({
  root,
  onChordChange
}: {
  root: Note
  onChordChange?: (chord: ChordType) => void
}) => {
  return (
    <div className='space-y-8'>
      <QualitySelect quality={'major'} onChange={() => {}} />
      {/* <SuspensionSelect value={suspended} onChange={setSuspended} />
      <ExtensionSelect value={extension} onChange={setExtension} />
      <AddedNotesSelect values={added} onChange={setAdded} /> */}
    </div>
  )
}

export default ChordSelector
