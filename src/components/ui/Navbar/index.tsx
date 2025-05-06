import { Settings, KeyboardMusic, Music } from 'lucide-preact'
import { withTooltip } from '../Tooltip'
import Separator from '../Separator'
import NavButton from './NavButton'
import { containerVariants } from './variants'

interface NavbarProps {
  variant?: 'default' | 'light'
  currentPath?: string
}

const Navbar = ({ variant = 'default', currentPath = '/' }: NavbarProps) => {
  const ScalesButton = withTooltip(NavButton, "Coming soon! We're working on scales", variant)
  const SettingsButton = withTooltip(NavButton, "Coming soon! We're working on settings", variant)

  return (
    <nav className={containerVariants({ variant })}>
      <div className="px-4 py-2">
        <div className="flex items-center h-10 gap-2">
          <NavButton isActive={currentPath === '/'}>
            <div className="flex items-center gap-2">
              <KeyboardMusic size={20} />
              <span>Chords</span>
            </div>
          </NavButton>
          <ScalesButton disabled>
            <div className="flex items-center gap-2">
              <Music size={20} />
              <span>Scales</span>
            </div>
          </ScalesButton>
          <Separator />
          <SettingsButton disabled>
            <Settings size={20} />
          </SettingsButton>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
