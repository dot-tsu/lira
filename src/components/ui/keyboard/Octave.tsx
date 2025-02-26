import { generateScale } from "@/lib/utils/music/scales";
import Note from "./Note";
import type NoteType from "@/lib/types/note";
import { getMidiNoteInfo } from "@/lib/utils/music/notes";

type OctaveProps = {
  activeNotes?: string[];
  tonic?: NoteType;
};

const Octave = ({ activeNotes = [], tonic = getMidiNoteInfo(12) }: OctaveProps) => {
  const chromaticScale = generateScale(tonic, "chromatic");
  console.log(chromaticScale)
  return (
    <div className="flex relative">
      {chromaticScale.notes.map((note: NoteType) => {
        const noteString = `${note.letter}${note.accidental ?? ""}`;
        
        const isActive = activeNotes.includes(noteString);

        return (
          <Note
            key={noteString}
            note={note}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};

export default Octave;
