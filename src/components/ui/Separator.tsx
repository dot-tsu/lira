import { cn } from "@/lib/utils"

const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('mx-4 p-[1px] bg-neutral-200', className)}
      aria-hidden
    />
  )
}

export default Separator
