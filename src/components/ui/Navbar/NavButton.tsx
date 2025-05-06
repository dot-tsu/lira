import { buttonVariants } from './variants'
import type { ComponentChildren } from 'preact'
import type { ButtonHTMLAttributes } from 'preact/compat'

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ComponentChildren
  variant?: 'default' | 'active' | 'disabled'
  isActive?: boolean
}

const NavButton = ({ children, isActive, disabled, ...props }: NavButtonProps) => (
  <button
    className={buttonVariants({
      variant: disabled ? 'disabled' : isActive ? 'active' : 'default'
    })}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

export default NavButton
