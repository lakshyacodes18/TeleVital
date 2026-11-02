import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './Container.tsx'
import { Logo } from './Logo.tsx'
import { NavDropdown } from './NavDropdown.tsx'
import { navigation, type NavGroup, type NavLinkItem } from '../data/navigation.ts'

export function TopBar() {
  // Single active dropdown state lifted to TopBar to ensure only one menu is open at once
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  // Mobile drawer state and mobile accordion group state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)

  // Reference for detecting clicks outside the navigation container
  const navRef = useRef<HTMLDivElement>(null)

  // Closes any open dropdown when user clicks outside the menu or hits Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenGroup(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    // Cleaning up event listeners prevents memory leaks and unintended triggers after unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Type guard to determine if a navigation entry is a group with child links
  const isNavGroup = (item: NavLinkItem | NavGroup): item is NavGroup => {
    return 'items' in item
  }

  // Smooth-scrolls to section if it is already present in the active DOM
  const handleSectionScroll = (href: string) => {
    const sectionId = href.startsWith('/') ? href.slice(1) : ''
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 h-20 bg-cream">
      <Container className="h-full">
        <div ref={navRef} className="flex h-full items-center justify-between">
          {/* Logo on the left */}
          <Logo />

          {/* Desktop Navigation items */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navigation.map((item) => {
              if (isNavGroup(item)) {
                return (
                  <NavDropdown
                    key={item.label}
                    group={item}
                    isOpen={openGroup === item.label}
                    onToggle={() =>
                      setOpenGroup(openGroup === item.label ? null : item.label)
                    }
                    onClose={() => setOpenGroup(null)}
                  />
                )
              }

              // Plain single link
              const isRouterLink = item.href.startsWith('/') && !item.href.includes('#')
              return isRouterLink ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleSectionScroll(item.href)}
                  className="text-lg font-normal text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-normal text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          {/* Desktop Action buttons on the right */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-lg border border-ink px-5 py-2.5 text-base font-semibold text-ink transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Log in
            </Link>
            <Link
              to="/join"
              className="rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Join TeleVital
            </Link>
          </div>

          {/* Mobile menu hamburger toggle button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu"
              className="inline-flex items-center justify-center rounded-lg p-2 text-ink hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel dropping below the top bar */}
        {isMobileMenuOpen && (
          <div className="border-b border-line bg-cream pb-6 pt-2 shadow-md lg:hidden">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navigation.map((item) => {
                if (isNavGroup(item)) {
                  const isGroupOpen = openMobileGroup === item.label
                  return (
                    <div key={item.label} className="border-b border-line/60 pb-2">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileGroup(isGroupOpen ? null : item.label)
                        }
                        className="flex w-full items-center justify-between py-2 text-left text-lg font-medium text-ink"
                        aria-expanded={isGroupOpen}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`h-4 w-4 transition-transform ${isGroupOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>

                      {isGroupOpen && (
                        <div className="flex flex-col gap-1 pl-4 pt-1">
                          {item.items.map((subItem) => {
                            if (subItem.soon) {
                              return (
                                <span
                                  key={subItem.label}
                                  className="flex items-center justify-between py-1.5 text-base text-muted"
                                >
                                  <span>{subItem.label}</span>
                                  <span className="rounded-full bg-sand px-2 py-0.5 text-xs text-control">
                                    Soon
                                  </span>
                                </span>
                              )
                            }
                            const isRouterLink =
                              subItem.href.startsWith('/') && !subItem.href.includes('#')
                            return isRouterLink ? (
                              <Link
                                key={subItem.label}
                                to={subItem.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  handleSectionScroll(subItem.href)
                                }}
                                className="py-1.5 text-base text-ink hover:text-primary"
                              >
                                {subItem.label}
                              </Link>
                            ) : (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  handleSectionScroll(subItem.href)
                                }}
                                className="py-1.5 text-base text-ink hover:text-primary"
                              >
                                {subItem.label}
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                // Plain link in mobile menu
                const isRouterLink = item.href.startsWith('/') && !item.href.includes('#')
                return isRouterLink ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleSectionScroll(item.href)
                    }}
                    className="py-2 text-lg font-medium text-ink hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleSectionScroll(item.href)
                    }}
                    className="py-2 text-lg font-medium text-ink hover:text-primary"
                  >
                    {item.label}
                  </a>
                )
              })}

              {/* Action buttons at the bottom of the mobile panel */}
              <div className="mt-4 flex flex-col gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-ink py-2.5 text-base font-semibold text-ink"
                >
                  Log in
                </Link>
                <Link
                  to="/join"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-base font-semibold text-white"
                >
                  Join TeleVital
                </Link>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}
