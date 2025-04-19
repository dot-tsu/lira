import type ChordType from '@/lib/types/chord'
import QualitySelect from './Parts/QualitySelect'
import SuspensionSelect from './Parts/SuspensionSelect'
import ExtensionSelect from './Parts/ExtensionSelect'
import AddedNotesSelect from './Parts/AddedNotesSelect'
import withUpdateChord from '@/hocs/withUpdateChord'
import type NoteType from '@/lib/types/note'
import { useEffect, useMemo } from 'react'
import Separator from '../../Separator'
import { getChordUIValidationState } from '@/lib/utils/music/chordValidation' // Importar la utilidad

const ChordSelectorSection = ({
  title,
  property,
  component: Component,
  updateChord,
  value,
  values,
  disabled,
  disabledValues
}: any) => (
  <div>
    <h3 className='text-xs mb-2 text-neutral-600 font-heading uppercase tracking-widest'>
      {title}
    </h3>
    <Component
      value={value}
      values={values}
      onChange={(newValue: any) => updateChord({ [property]: newValue })}
      disabled={disabled}
      disabledValues={disabledValues}
    />
  </div>
)

const ChordSelector = ({
  chord,
  updateChord,
  root
}: {
  chord: ChordType
  root: NoteType
  updateChord: (updates: any) => void
}) => {
  useEffect(() => {
    if (chord.root.midiNumber === root.midiNumber) return
    updateChord({ root })
  }, [root, updateChord, chord.root.midiNumber])

  const uiValidationState = useMemo(
    () => getChordUIValidationState(chord),
    [chord.quality, chord.suspended]
  )

  return (
    <div className='space-y-6'>
      <ChordSelectorSection
        title='Quality'
        property='quality'
        component={QualitySelect}
        updateChord={updateChord}
        value={chord?.quality}
        disabled={uiValidationState.disableQualitySelect}
      />

      <div className='flex'>
        <ChordSelectorSection
          title='Suspension'
          property='suspended'
          component={SuspensionSelect}
          updateChord={updateChord}
          value={chord?.suspended}
          disabled={uiValidationState.disableSuspensionSelect}
        />
        <Separator />
        <ChordSelectorSection
          title='Added notes'
          property='added'
          component={AddedNotesSelect}
          updateChord={updateChord}
          values={chord?.added || []}
          disabledValues={uiValidationState.disabledAddedNoteValues}
        />
      </div>

      <ChordSelectorSection
        title='Extension'
        property='extension'
        component={ExtensionSelect}
        updateChord={updateChord}
        value={chord?.extension}
        disabledValues={uiValidationState.disabledExtensionValues}
      />
    </div>
  )
}

export default withUpdateChord(ChordSelector)
