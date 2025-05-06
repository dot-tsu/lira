import { useState, useCallback } from 'react'
import type ChordType from '@/lib/types/chord'
import type NoteType from '@/lib/types/note'
import { generateChord } from '@/lib/utils/music/chords'
import { getMidiNoteInfo } from '@/lib/utils/music/notes'

const withChordRootHandling = (WrappedComponent: React.ComponentType<any>) => {
  const DEFAULT_ROOT = getMidiNoteInfo(0)
  const DEFAULT_CHORD = generateChord(DEFAULT_ROOT, 'Major')

  return (props: any) => {
    const [root, setRoot] = useState<NoteType>(DEFAULT_ROOT)
    const [chord, setChord] = useState<ChordType>(DEFAULT_CHORD)

    const handleRootChange = useCallback((newRoot: NoteType) => {
      const options = {
        suspended: chord.suspended,
        extension: chord.extension,
        added: chord.added,
        inversion: chord.inversion
      }
      const newChord = generateChord(newRoot, chord.quality.quality, options)
      setRoot(newRoot)
      setChord(newChord)
    }, [chord])

    return (
      <WrappedComponent
        {...props}
        root={root}
        chord={chord}
        onRootChange={handleRootChange}
        setChord={setChord}
      />
    )
  }
}

export default withChordRootHandling
