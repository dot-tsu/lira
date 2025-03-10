import type { ChordQuality } from '@/lib/types/chord'
import MusicButton from '../../MusicButton'
import { CHORD_QUALITIES } from '@/lib/constants/music'

const QualitySelect = ({
  selectedQuality,
  onChange
}: {
  selectedQuality: ChordQuality
  onChange: (quality: ChordQuality) => void
}) => {
  return (
    <div className='flex gap-2'>
      {CHORD_QUALITIES.map((quality) => {
        const qualityName =
          quality.quality.charAt(0).toUpperCase() + quality.quality.slice(1)
        return (
          <MusicButton
            key={quality.quality}
            title={qualityName}
            label={quality.notation as string}
            description={quality?.description}
            active={selectedQuality.quality === quality.quality}
            onClick={() => {
              onChange(quality)
            }}
          />
        )
      })}
    </div>
  )
}

export default QualitySelect
