import { cn } from "@/lib/utils"

const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('mx-4 h-full w-[2px] bg-neutral-200', className)}
      aria-hidden
    />
  )
}

export default Separator
