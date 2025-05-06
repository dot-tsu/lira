import type ChordType from '@/lib/types/chord'
import type NoteType from '@/lib/types/note'
import { generateChord } from '@/lib/utils/music/chords'
import { useCallback } from 'preact/hooks'

interface Props {
  chord: ChordType
  onChange: (chord: ChordType) => void
  root: NoteType
}

const withUpdateChord = (WrappedComponent: any) => {
  return (props: Props) => {
    const { chord, onChange } = props

    const updateChord = useCallback(
      (updates: any) => {
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

        const newRoot = mergedParams.root ?? chord.root
        const newChord = generateChord(
          newRoot,
          mergedParams.quality.quality,
          options
        )

        onChange(newChord)
      },
      [chord, onChange]
    )

    return <WrappedComponent updateChord={updateChord} {...props} />
  }
}

export default withUpdateChord
