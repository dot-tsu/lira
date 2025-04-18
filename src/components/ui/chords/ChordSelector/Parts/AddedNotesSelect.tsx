import MusicButton from '@/components/ui/MusicButton'
import { ADDED_NOTES } from '@/lib/constants/music'

const AddedNotesSelect = ({
  values,
  onChange
}: {
  values: number[]
  onChange: (added: number[]) => void
}) => {
  const handleToggleNote = (noteValue: number) => {
    const currentIndex = values.indexOf(noteValue)
    let newAddedNotes = [...values]

    if (currentIndex === -1) {
      newAddedNotes.push(noteValue)
    } else {
      newAddedNotes.splice(currentIndex, 1)
    }
    newAddedNotes.sort((a, b) => a - b)
    onChange(newAddedNotes)
  }

  return (
    <div>
      <div className='flex gap-2 flex-wrap'>
        {ADDED_NOTES.map((addedNoteOption) => {
          const { value: optionValue, notation, description } = addedNoteOption
          const isActive = values.includes(optionValue)

          return (
            <MusicButton
              key={optionValue}
              title={optionValue.toString()}
              label={notation}
              description={description}
              active={isActive}
              onClick={() => {
                handleToggleNote(optionValue)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AddedNotesSelect
