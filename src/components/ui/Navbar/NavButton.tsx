import { buttonVariants } from "./variants"

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
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
