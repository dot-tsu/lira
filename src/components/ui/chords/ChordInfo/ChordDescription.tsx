import type Chord from '@/lib/types/chord'

const ChordDescription = ({ chord }: { chord: Chord }) => {
  if (!chord.description) {
    return (
      <div className="text-lg font-heading text-center max-w-xl text-neutral-500">
        <p>We haven't written about this chord yet, but we'd love to hear what you think about it!   <a
          href={`mailto:lucanahtsu@gmail.com?subject=Suggestion for ${chord.symbol.full} chord description`}
          className="text-neutral-500 hover:text-neutral-700 underline mt-2 inline-block transition-colors duration-300"
        >
          Suggest a description ↗
        </a></p>

      </div>
    )
  }

  return (
    <div className="text-lg font-heading text-center max-w-xl">
      {chord.description.split('. ').map((sentence, index) => (
        <p key={index}>
          {sentence}
        </p>
      ))}
    </div>
  )
}

export default ChordDescription
