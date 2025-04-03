import type ChordType from '@/lib/types/chord'
import { generateChord } from '@/lib/utils/music/chords'

interface Props {
  chord: ChordType
  onChange: (chord: ChordType) => void
}

const withUpdateChord = (WrappedComponent: any) => {
  return (props: Props) => {
    const { chord, onChange } = props

    // TODO: Add types
    const updateChord = (updates: any) => {
      const mergedParams = {
        quality: chord.quality,
        suspended: chord.suspended,
        extension: chord.extension,
        added: chord.added,
        ...updates
      }

      const options: any = {
        inversion: chord.inversion
      }

      if (mergedParams.suspended) {
        options.suspended = mergedParams.suspended
      }

      if (mergedParams.extension) {
        options.extension = mergedParams.extension
      }

      if (mergedParams.added && mergedParams.added.length > 0) {
        options.added = mergedParams.added
      }

      const newChord = generateChord(
        chord.root,
        mergedParams.quality.quality,
        options
      )
      onChange(newChord)
    }

    return <WrappedComponent updateChord={updateChord} {...props} />
  }
}

export default withUpdateChord
