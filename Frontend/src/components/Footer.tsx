import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './Container.tsx'
import { Logo } from './Logo.tsx'

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  // Handle newsletter subscription without external network calls
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  // Smooth-scrolls to in-page section if currently on the page
  const handleSectionScroll = (href: string) => {
    const sectionId = href.startsWith('/') ? href.slice(1) : ''
    if (sectionId) {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="border-t border-line bg-primary pt-20 pb-16 lg:pt-28 lg:pb-20 text-white">
      <Container>
        {/* Main multi-column footer grid with generous spacing */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          {/* Brand Column (3 columns on desktop) */}
          <div className="lg:col-span-3">
            <Logo inverted />
            <p className="mt-4 max-w-xs text-base leading-relaxed text-white/80">
              Specialist care for every health centre.
            </p>
          </div>

          {/* Services Column (2 columns on desktop) */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <span className="flex items-center justify-between text-white/60">
                  <span>Emergency referral</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">Soon</span>
                </span>
              </li>
              <li>
                <span className="flex items-center justify-between text-white/60">
                  <span>Specialist advice</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">Soon</span>
                </span>
              </li>
              <li>
                <span className="flex items-center justify-between text-white/60">
                  <span>Prescriptions</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">Soon</span>
                </span>
              </li>
              <li>
                <span className="flex items-center justify-between text-white/60">
                  <span>Transfers and ambulance</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">Soon</span>
                </span>
              </li>
              <li>
                <span className="flex items-center justify-between text-white/60">
                  <span>Follow-up care</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">Soon</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Who it's for Column (2 columns on desktop) */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-white">
              Who it’s for
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <Link
                  to="/people"
                  onClick={() => handleSectionScroll('/people')}
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Nurses and ANMs
                </Link>
              </li>
              <li>
                <Link
                  to="/people"
                  onClick={() => handleSectionScroll('/people')}
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Medical officers
                </Link>
              </li>
              <li>
                <Link
                  to="/people"
                  onClick={() => handleSectionScroll('/people')}
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Specialists
                </Link>
              </li>
              <li>
                <Link
                  to="/people"
                  onClick={() => handleSectionScroll('/people')}
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  District officers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column (2 columns on desktop) */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-white">
              Resources
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <Link
                  to="/how"
                  onClick={() => handleSectionScroll('/how')}
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={() => handleSectionScroll('/faq')}
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Frequently asked questions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Privacy notice
                </Link>
              </li>
              <li>
                <Link
                  to="/grievance"
                  className="text-white/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Grievance contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Updates Newsletter Column (3 columns on desktop) */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-base font-semibold text-white">
              Subscribe to updates
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Receive updates on new specialist hubs and rollout schedules.
            </p>

            {subscribed ? (
              <div className="mt-5 rounded-xl bg-white/10 p-3.5 text-xs text-white">
                Thank you. We will send progress updates to your email.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col gap-3">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your clinic email"
                  required
                  className="w-full rounded-xl border border-white/25 bg-primary-dark/40 px-4 py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sign up
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom divider and sub-bar with generous margin */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 text-sm text-white/70 sm:flex-row lg:mt-24">
          <div className="flex flex-wrap items-center gap-8 sm:gap-10">
            <Link
              to="/privacy"
              className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Privacy notice
            </Link>
            <Link
              to="/grievance"
              className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Grievance contact
            </Link>
            <Link
              to="/how"
              onClick={() => handleSectionScroll('/how')}
              className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              How it works
            </Link>
          </div>

          <div className="text-xs text-white/60">
            © TeleVital
          </div>
        </div>
      </Container>
    </footer>
  )
}
