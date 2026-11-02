import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './Container.tsx'

export function TopBar() {
  // Mobile drawer state: controls whether the phone menu is shown or hidden
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Helper to close mobile menu when a navigation item is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream">
      <Container>
        <div className="flex h-18 items-center justify-between">
          {/* Logo with serif typography and primary blue branding */}
          <Link
            to="/"
            className="font-serif text-2xl font-bold tracking-tight text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            TeleVital
          </Link>

          {/* Desktop navigation links - hidden on mobile viewports */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a
              href="#how"
              className="text-base text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              How it works
            </a>
            <a
              href="#people"
              className="text-base text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              For health centres
            </a>
            <a
              href="#people"
              className="text-base text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              For specialists
            </a>
            <a
              href="#faq"
              className="text-base text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Resources
            </a>
            {/* Pill button linking to /login */}
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-base font-medium text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign in
            </Link>
          </nav>

          {/* Hamburger button for phone screens */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // aria-expanded tells assistive technology whether the menu panel is open
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center rounded-lg p-2 text-ink hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {isMenuOpen ? (
                // Close 'X' icon
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
                // Hamburger icon
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

        {/* Mobile menu dropdown panel */}
        {isMenuOpen && (
          <nav
            className="border-t border-line py-4 md:hidden flex flex-col gap-4"
            aria-label="Mobile navigation"
          >
            <a
              href="#how"
              onClick={handleLinkClick}
              className="text-base text-ink hover:text-primary py-1"
            >
              How it works
            </a>
            <a
              href="#people"
              onClick={handleLinkClick}
              className="text-base text-ink hover:text-primary py-1"
            >
              For health centres
            </a>
            <a
              href="#people"
              onClick={handleLinkClick}
              className="text-base text-ink hover:text-primary py-1"
            >
              For specialists
            </a>
            <a
              href="#faq"
              onClick={handleLinkClick}
              className="text-base text-ink hover:text-primary py-1"
            >
              Resources
            </a>
            <div className="pt-2">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-2.5 text-base font-medium text-white transition hover:bg-primary-dark"
              >
                Sign in
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  )
}

