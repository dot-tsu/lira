import type NoteType from "@/lib/types/note";
import { cn } from "@/lib/utils";
import { isBlackKey } from "@/lib/utils/music/notes";
import { cva } from "class-variance-authority";

const noteVariants = cva(
  "flex items-center justify-center text-sm rounded-b-lg shadow-md",
  {
    variants: {
      variant: {
        white: "bg-white text-black h-48 w-12",
        black: "bg-black text-white h-32 w-8 -mx-4 z-10",
        active: "TODO",
      },
    },
    defaultVariants: {
      variant: "white",
    },
  }
);

const Note = ( {
  note,
  isActive,
  onClick,
}: {
  note: NoteType
  isActive?: boolean
  onClick?: VoidFunction
  } ) => {
  const variant = isBlackKey(note) ? "black" : "white"

  return (
    <button
      onClick={onClick}
      className={cn(
        noteVariants({ variant: isActive ? "active" : variant }),
        "relative flex items-end justify-center pb-5",
        "duration-100 ease-in-out hover:translate-y-1 hover:shadow-lg active:translate-y-2 active:shadow-md"
      )}
    >
      {note.letter}
      <small>{note.accidental}</small>
      <span className="absolute bottom-2 text-xs text-gray-500">{note.octave}</span>
    </button>
  );
};

export default Note;
