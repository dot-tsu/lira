import type ChordType from "@/lib/types/chord"

const Root = ( { root }: { root: string } ) => (
  <span className='text-5xl font-bold text-slate-900 dark:text-white'>
    {root}
  </span>
)

const Quality = ({ quality }: { quality: string }) => (
  <span className='text-4xl font-semibold text-orange-400'>{quality}</span>
)

const Extension = ({ extension }: { extension: string }) => (
  <span className='text-2xl ml-0.5 text-slate-500 dark:text-slate-400 font-medium'>
    {extension}
  </span>
)

const Added = ({ added }: { added: string }) => (
  <span className='text-2xl ml-0.5 text-orange-400 font-medium'>{added}</span>
)

const Suspension = ({ suspension }: { suspension: string }) => (
  <span className='text-2xl ml-0.5 text-slate-500 dark:text-slate-400 font-medium'>
    {suspension}
  </span>
)

const ChordName = ({ chord }: { chord: ChordType }) => {
  const { root, quality, extension, added, suspension } = chord.symbol.parts

  return (
    <div className='flex items-baseline'>
      <Root root={root} />
      {quality && <Quality quality={quality} />}
      {extension && <Extension extension={extension} />}
      {suspension && <Suspension suspension={suspension} />}
      {added && <Added added={added} />}
    </div>
  )
}

export default ChordName
