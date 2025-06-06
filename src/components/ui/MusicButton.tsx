import { COLOR } from '@/lib/constants/ui'
import { cn } from '@/lib/utils'

const MusicButton = ({
  title,
  label,
  description,
  onClick,
  active,
  disabled
}: {
  title: string
  label?: string
  description?: string
  onClick: () => void
  active?: boolean
  disabled?: boolean
}) => {
  return (
    <button
      className={cn(
        'flex flex-col p-2 border border-neutral-300 text-left rounded-lg',
        'transition-colors ease-in-out',
        {
          [`hover:!border-${COLOR}-500 hover:!bg-${COLOR}-50`]: !disabled,
          [`!border-${COLOR}-500 !bg-${COLOR}-50`]: active,
          'opacity-50 cursor-not-allowed': disabled
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <p className='text-lg font-heading no-ligatures'>
        {title}
        {label && (
          <span className={`font-medium !text-${COLOR}-500`}> ({label})</span>
        )}
      </p>
    </button>
  )
}

export default MusicButton
