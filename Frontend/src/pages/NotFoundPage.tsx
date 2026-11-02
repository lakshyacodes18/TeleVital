import { Link } from 'react-router-dom'
import { Container } from '../components/Container.tsx'
import { TopBar } from '../components/TopBar.tsx'
import { Footer } from '../components/Footer.tsx'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <TopBar />

      <main className="flex flex-1 items-center py-20 lg:py-32">
        <Container className="text-center">
          <div className="mx-auto max-w-xl">
            {/* Serif heading in sentence case */}
            <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              We couldn’t find the page you were looking for. This part of TeleVital may still be in development.
            </p>
            <div className="mt-8 flex justify-center">
              {/* Pill button navigating back to the Welcome page */}
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-medium text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

