import type { ChordQuality as Quality } from '@/lib/types/chord'
import MusicButton from '../../MusicButton'
import { CHORD_QUALITIES as QUALITIES } from '@/lib/constants/music'

const QualitySelect = ({
  value,
  onChange
}: {
  value?: Quality
  onChange: (quality: Quality) => void
}) => {
  return (
    <div className='flex gap-2'>
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
          />
        )
      })}
    </div>
  )
}

export default QualitySelect
