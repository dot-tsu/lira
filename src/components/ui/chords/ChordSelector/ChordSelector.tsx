import type ChordType from '@/lib/types/chord'
import QualitySelect from './Parts/QualitySelect'
import SuspensionSelect from './Parts/SuspensionSelect'
import ExtensionSelect from './Parts/ExtensionSelect'
import AddedNotesSelect from './Parts/AddedNotesSelect'
import withUpdateChord from '@/hocs/withUpdateChord'
import type NoteType from '@/lib/types/note'
import { useMemo } from 'react'
import Separator from '../../Separator'
import { getChordUIValidationState } from '@/lib/utils/music/chordValidation'

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

      <div className='flex flex-wrap gap-4 lg:flex-nowrap lg:gap-4'>
        <ChordSelectorSection
          title='Suspension'
          property='suspended'
          component={SuspensionSelect}
          updateChord={updateChord}
          value={chord?.suspended}
          disabled={uiValidationState.disableSuspensionSelect}
        />
        <Separator className='hidden lg:block h-[unset]' />  {/* TODO: This is a hack to fix the separator height, fix */}

        <ChordSelectorSection
          title='Extension'
          property='extension'
          component={ExtensionSelect}
          updateChord={updateChord}
          value={chord?.extension}
          disabledValues={uiValidationState.disabledExtensionValues}
        />
      </div>
      <ChordSelectorSection
        title='Added notes'
        property='added'
        component={AddedNotesSelect}
        updateChord={updateChord}
        values={chord?.added || []}
        disabledValues={uiValidationState.disabledAddedNoteValues}
      />
    </div>
  )
}

export default withUpdateChord(ChordSelector)
