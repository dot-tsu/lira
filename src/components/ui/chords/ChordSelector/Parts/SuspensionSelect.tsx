import MusicButton from '@/components/ui/MusicButton'
import { SUSPENSIONS } from '@/lib/constants/music'

const SuspensionSelect = ({
  value,
  onChange
}: {
  value?: number
  onChange: (suspension: number | null) => void
}) => {
  return (
    <div>
      <div className='flex gap-2 flex-wrap'>
        {SUSPENSIONS.map((suspensionOption) => {
          const { value: optionValue, notation, description } = suspensionOption
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

export default SuspensionSelect
