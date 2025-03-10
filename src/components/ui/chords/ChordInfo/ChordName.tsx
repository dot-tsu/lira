import { COLOR } from '@/lib/constants/ui'
import type ChordType from '@/lib/types/chord'
import type Note from '@/lib/types/note'
import { getBassNote } from '@/lib/utils/music/chords'

const Root = ({ root }: { root: string }) => (
  <span className='text-5xl font-bold text-slate-900 tracking-tight leading-none'>
    {root}
  </span>
)

const Quality = ({ quality }: { quality: string }) => (
  <span className={`text-4xl font-semibold text-${COLOR}-400 leading-none`}>
    {quality}
  </span>
)

const Extension = ({ extension }: { extension: string }) => (
  <span className='text-2xl text-slate-500 font-medium ml-0.5 relative top-px leading-none'>
    {extension}
  </span>
)

const Added = ({ added }: { added: string }) => (
  <span
    className={`text-2xl text-${COLOR}-400 font-medium ml-0.5 relative top-px leading-none`}
  >
    {added}
  </span>
)

const Suspension = ({ suspension }: { suspension: string }) => (
  <span className='text-2xl text-slate-500 font-medium ml-0.5 relative top-px leading-none'>
    {suspension}
  </span>
)

const Bass = ({ bassNote }: { bassNote: Note | null }) => {
  if (!bassNote) return null

  return (
    <span className='text-3xl text-slate-600 font-semibold ml-1 leading-none'>
      /{bassNote.letter + (bassNote.accidental ?? '')}
    </span>
  )
}

const ChordName = ({ chord }: { chord: ChordType }) => {
  const { root, quality, extension, added, suspension } = chord.symbol.parts
  const bassNote = getBassNote(chord)

  return (
    <div className='inline-flex items-baseline group hover:opacity-90 transition-opacity'>
      <Root root={root} />
      {quality && <Quality quality={quality} />}
      {extension && <Extension extension={extension} />}
      {suspension && <Suspension suspension={suspension} />}
      {added && <Added added={added} />}
      {bassNote && <Bass bassNote={bassNote} />}
    </div>
  )
}

export default ChordName
