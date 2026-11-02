import { useRef, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import type { NavGroup } from '../data/navigation.ts'

interface NavDropdownProps {
  group: NavGroup
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export function NavDropdown({ group, isOpen, onToggle, onClose }: NavDropdownProps) {
  // Reference to the trigger button so we can restore focus when Escape is pressed
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Handle Escape key: closes menu and returns keyboard focus back to the button
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      buttonRef.current?.focus()
    }
  }

  // Closes dropdown and scrolls directly to the section if it is already present in the DOM
  const handleItemClick = (href: string) => {
    onClose()
    const sectionId = href.startsWith('/') ? href.slice(1) : ''
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 text-lg font-normal text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span>{group.label}</span>
        {/* Chevron icon rotates when menu is open */}
        <svg
          className={`h-4 w-4 text-ink transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Absolutely positioned dropdown panel */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-64 rounded-xl border border-line bg-card py-2 shadow-lg">
          <ul role="menu" className="flex flex-col">
            {group.items.map((item) => {
              // Greyed-out non-clickable item for features coming soon
              if (item.soon) {
                return (
                  <li key={item.label} role="none">
                    <span className="flex items-center justify-between px-4 py-2.5 text-base text-muted">
                      <span>{item.label}</span>
                      <span className="rounded-full bg-sand px-2 py-0.5 text-xs font-medium text-control">
                        Soon
                      </span>
                    </span>
                  </li>
                )
              }

              // Internal router link if starts with '/' and contains no hash
              const isRouterLink = item.href.startsWith('/') && !item.href.includes('#')

              return (
                <li key={item.label} role="none">
                  {isRouterLink ? (
                    <Link
                      to={item.href}
                      onClick={() => handleItemClick(item.href)}
                      role="menuitem"
                      className="block px-4 py-2.5 text-base text-ink transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => handleItemClick(item.href)}
                      role="menuitem"
                      className="block px-4 py-2.5 text-base text-ink transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

