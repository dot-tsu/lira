import type ChordType from '@/lib/types/chord'
import QualitySelect from './Parts/QualitySelect'
import SuspensionSelect from './Parts/SuspensionSelect'
import ExtensionSelect from './Parts/ExtensionSelect'
import AddedNotesSelect from './Parts/AddedNotesSelect'
import withUpdateChord from '@/hocs/withUpdateChord'
import type NoteType from '@/lib/types/note'
import { useEffect } from 'react'

const ChordSelector = ({
  chord,
  updateChord,
  root
}: {
  chord: ChordType
  root: NoteType
  // TODO: Add types
  updateChord: (updates: any) => void
}) => {
  useEffect(() => {
    if (chord.root.midiNumber === root.midiNumber) return
    updateChord({ root })
  }, [root, updateChord, chord.root.midiNumber])
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-sm font-medium mb-2 text-gray-600'>Quality</h3>
        <QualitySelect
          value={chord?.quality}
          onChange={(newQuality) => {
            updateChord({ quality: newQuality })
          }}
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2 text-gray-600'>Suspension</h3>
        <SuspensionSelect
          value={chord?.suspended}
          onChange={(suspension) => {
            updateChord({ suspended: suspension })
          }}
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2 text-gray-600'>Extension</h3>
        <ExtensionSelect
          value={chord?.extension}
          onChange={(extension) => {
            updateChord({ extension: extension })
          }}
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2 text-gray-600'>Added Notes</h3>
        <AddedNotesSelect
          values={chord?.added || []}
          onChange={(added) => {
            updateChord({ added: added })
          }}
        />
      </div>
    </div>
  )
}

export default withUpdateChord(ChordSelector)
