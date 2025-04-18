import MusicButton from '@/components/ui/MusicButton'
import { EXTENSIONS } from '@/lib/constants/music'
import type { ChordExtension } from '@/lib/types/chord'

const ExtensionSelect = ({
  value,
  onChange
}: {
  value?: ChordExtension
  onChange: (extension: ChordExtension | null) => void
}) => {
  return (
    <div>
      <div className='flex gap-2 flex-wrap'>
        {EXTENSIONS.map((extensionOption) => {
          const { value: optionValue, notation, description } = extensionOption
          const isActive = value === optionValue

          return (
            <MusicButton
              key={optionValue}
              title={optionValue.toString()}
              label={notation}
              description={description}
              active={isActive}
              onClick={() => {
                onChange(isActive ? null : optionValue)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ExtensionSelect
