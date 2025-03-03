import type ChordType from "@/lib/types/chord"
import ChordName from "./chord/ChordName"

const ChordInfo = ({chord}: {chord: ChordType}) => {
  return (
    <>
      <ChordName chord={chord} />
      {/* <ChordDescription chord={chord} />
      <ChordNoteDetails chord={chord} />
      <ChordUsage chord={chord} /> */}
    </>
  )
}

export default ChordInfo
