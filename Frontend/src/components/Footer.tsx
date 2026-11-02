import { Link } from 'react-router-dom'
import { Container } from './Container.tsx'

export function Footer() {
  return (
    <footer className="border-t border-line bg-sand py-12 text-ink">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            {/* Consistent TeleVital logo typography */}
            <Link
              to="/"
              className="font-serif text-2xl font-bold tracking-tight text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              TeleVital
            </Link>
            <p className="mt-2 text-base text-muted">
              Specialist care for every health centre.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <Link
              to="/privacy"
              className="text-base text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Privacy notice
            </Link>
            <Link
              to="/grievance"
              className="text-base text-ink transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Grievance contact
            </Link>

            {/* Outlined indicator badge showing project stage */}
            <span className="inline-flex items-center rounded-full border border-control px-3.5 py-1 text-sm font-medium text-control">
              Pilot programme
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

