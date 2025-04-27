import type { ChordQuality as Quality } from '@/lib/types/chord'
import MusicButton from '@/components/ui/MusicButton'
import { QUALITIES } from '@/lib/constants/music'

const QualitySelect = ({
  value,
  onChange,
  disabled
}: {
  value?: Quality
  onChange: (quality: Quality) => void
  disabled: boolean
}) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {QUALITIES.map((rawQuality) => {
        const { quality, notation, description } = rawQuality
        return (
          <MusicButton
            key={quality}
            title={quality}
            label={notation as string}
            description={description}
            active={value?.quality === quality}
            onClick={() => {
              onChange(rawQuality)
            }}
            disabled={disabled}
          />
        )
      })}
    </div>
  )
}

export default QualitySelect
