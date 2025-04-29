import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { cva } from 'class-variance-authority'

const tooltipVariants = cva(
  'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md whitespace-nowrap transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white text-sm',
        light: 'bg-white text-neutral-900 text-sm border border-neutral-200'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const arrowVariants = cva(
  'absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900',
        light: 'bg-white border-r border-b border-neutral-200'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface TooltipProps {
  children: ReactNode
  content: string
  className?: string
  variant?: 'default' | 'light'
}

const Tooltip = ({ children, content, className, variant = 'default' }: TooltipProps) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className={cn(
        tooltipVariants({ variant }),
        'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
        className
      )}>
        {content}
        <div className={arrowVariants({ variant })} />
      </div>
    </div>
  )
}

export const withTooltip = (WrappedComponent: React.ComponentType<any>, tooltipContent: string, variant?: 'default' | 'light') => {
  return (props: any) => (
    <Tooltip content={tooltipContent} variant={variant}>
      <WrappedComponent {...props} />
    </Tooltip>
  )
}

export default Tooltip
