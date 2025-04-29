import { COLOR } from '@/lib/constants/ui'
import { cva } from 'class-variance-authority'

export const containerVariants = cva(
  'fixed bottom-16 left-1/2 -translate-x-1/2 z-50',
  {
    variants: {
      variant: {
        default: 'bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-neutral-200',
        light: 'bg-white rounded-full shadow-lg border border-neutral-200'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export const buttonVariants = cva(
  'p-2 transition-colors',
  {
    variants: {
      variant: {
        default: 'text-neutral-600 hover:text-neutral-900',
        active: `!text-${COLOR}-500`,
        disabled: 'text-neutral-400 cursor-not-allowed opacity-50'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
