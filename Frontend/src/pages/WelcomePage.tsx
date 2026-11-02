import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '../components/Container.tsx'
import { TopBar } from '../components/TopBar.tsx'
import { Footer } from '../components/Footer.tsx'
import { FaqItem } from '../components/FaqItem.tsx'
import { HowItWorksSection } from '../components/HowItWorksSection.tsx'

// Put a photo in Frontend/public/images/hero.jpg and set HERO_IMAGE = "/images/hero.jpg"
const HERO_IMAGE = '/images/hero.jpg'

export default function WelcomePage() {
  const location = useLocation()

  // Scroll to corresponding page section when routing to paths without a hash (e.g. /how -> #how)
  useEffect(() => {
    const sectionMap: Record<string, string> = {
      '/how': 'how',
      '/people': 'people',
      '/faq': 'faq',
    }

    const targetSection = sectionMap[location.pathname]
    if (targetSection) {
      // Small timeout gives the DOM time to render before scrolling
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(targetSection)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
      return () => clearTimeout(timeoutId)
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, location.key])

  // Section visibility for staggered fade-up animation in the connectivity band
  const connectivityRef = useRef<HTMLElement>(null)
  const [isConnectivityVisible, setIsConnectivityVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsConnectivityVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (connectivityRef.current) {
      observer.observe(connectivityRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Checklist items for the Hero section
  const heroChecklist = [
    'A city specialist on every referral',
    'Care within minutes, not hours',
    'Works on the phones you already have',
    'Built for nurses and ANMs, in your language',
    'One record that follows the patient',
  ]

  // Configurable roles data: swap image paths or leave empty to use warm-toned gradient placeholders
  const roles = [
    {
      role: 'For nurses and ANMs',
      description:
        'Guided prompts and local language inputs make case entry clear without adding complex paperwork.',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      fallbackGradient: 'from-[#3D2E24] via-[#2A1F18] to-[#120E0B]',
      alt: 'Nurse and ANM examining patient notes in health clinic',
    },
    {
      role: 'For medical officers',
      description:
        'Obtain timely specialist second opinions to make confident decisions on treatment and transfers.',
      image:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      fallbackGradient: 'from-[#2C3844] via-[#1E2730] to-[#0E1318]',
      alt: 'Medical officer reviewing referral recommendations',
    },
    {
      role: 'For specialists',
      description:
        'Review triage-sorted patient vitals quickly and guide frontline teams directly from your clinic.',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      fallbackGradient: 'from-[#342D38] via-[#231E26] to-[#110E13]',
      alt: 'City hospital specialist triaging digital health records',
    },
    {
      role: 'For district officers',
      description:
        'Track referral activity and clinical follow-up across centres with transparent case summaries.',
      image:
        'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
      fallbackGradient: 'from-[#3A332B] via-[#26211B] to-[#13100D]',
      alt: 'District health officer monitoring referral health metrics',
    },
  ]

  // Items for the "Works where connectivity doesn't" band
  const connectivityItems = [
    {
      text: 'Saved on the device and sent when signal returns',
      delay: 'delay-100',
      icon: (
        <svg
          className="h-14 w-14 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
      ),
    },
    {
      text: 'One tap to phone the hub desk',
      delay: 'delay-200',
      icon: (
        <svg
          className="h-14 w-14 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
    },
    {
      text: 'Runs on the phones you already have',
      delay: 'delay-300',
      icon: (
        <svg
          className="h-14 w-14 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      ),
    },
  ]

  // FAQ items with honest answers and typographic apostrophes (’)
  const faqs = [
    {
      question: 'Do we need new equipment?',
      answer:
        'No special equipment is needed. TeleVital works in standard web browsers on the smartphones, tablets, or computers your facility already uses.',
    },
    {
      question: 'Does it replace our current referral process?',
      answer:
        'It supports your current referral steps by organising clinical details beforehand, rather than replacing your established hospital protocols.',
    },
    {
      question: 'What if the internet is down?',
      answer:
        'Case details remain safely stored on your local device and synchronise automatically once connectivity returns.',
    },
    {
      question: 'Who can see a patient’s record?',
      answer:
        'Only the verified health centre team caring for the patient and the assigned reviewing specialist can view the record.',
    },
    {
      question: 'Is patient data safe?',
      answer:
        'Access requires individual staff logins, keeping medical notes private between your health centre and the consulting specialist.',
    },
    {
      question: 'Who is TeleVital for?',
      answer:
        'TeleVital is designed for rural nurses, ANMs, medical officers, and hospital specialists working together across referral networks.',
    },
  ]

  return (
    <div className="min-h-screen bg-cream text-ink">
      <TopBar />

      <main>
        {/* 1. Hero Section: Two full halves that fill the screen below the 80px top bar */}
        <section className="grid lg:grid-cols-2 lg:min-h-[calc(100vh-5rem)]">
          {/* Left half: Full-bleed sand text panel aligned with the logo margin */}
          <div className="flex flex-col justify-center bg-sand px-5 py-14 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16">
            {/* Editorial headline: Fraunces serif, normal font weight, with 'minutes' italicised */}
            <h1 className="font-serif font-normal text-5xl leading-[1.08] tracking-tight text-ink md:text-6xl xl:text-7xl">
              Specialist care, within <em>minutes</em>, at every health centre.
            </h1>

            {/* Generously spaced checklist with blue circle ticks */}
            <ul className="mt-8 space-y-5 sm:mt-10">
              {heroChecklist.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  {/* Blue circular badge containing an SVG tick mark */}
                  <span
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="text-xl font-normal text-ink">{item}</span>
                </li>
              ))}
            </ul>

            {/* Action buttons: Send a referral (primary) and Find your hub (cream) */}
            <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Send a referral
              </Link>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-full bg-cream px-8 py-4 text-lg font-semibold text-ink transition hover:bg-cream/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Find your hub
              </a>
            </div>
          </div>

          {/* Right half: Full-bleed photo panel */}
          <div className="h-[20rem] w-full lg:h-full">
            {HERO_IMAGE ? (
              <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-apricot/50">
                <span className="text-sm font-medium text-ink">
                  Hero photo goes here
                </span>
              </div>
            )}
          </div>
        </section>

        {/* 2. How it works Section: Two-column layout with numbered steps and referral wheel */}
        <HowItWorksSection />

        {/* 3. Built for the people who use it Section: Services grid layout */}
        <section id="people" className="scroll-mt-24 bg-cream py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-5 lg:px-8">
            {/* Centered serif headline at weight 400 with tight tracking */}
            <h2 className="-tracking-[0.01em] text-center font-serif text-3xl font-normal text-ink sm:text-4xl md:text-[42px] md:leading-tight">
              Built for the people who use it
            </h2>

            {/* Subheading explaining the collaborative role ecosystem */}
            <p className="mx-auto mt-3 max-w-xl text-center font-sans text-base text-muted sm:text-lg">
              One platform, built around every role in the referral chain.
            </p>

            {/* Responsive grid: compact 4 columns on desktop, 2x2 on tablet, 1 column on mobile */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:mt-12">
              {roles.map((item) => (
                <div
                  key={item.role}
                  className="group relative h-[320px] w-full max-w-sm sm:max-w-none mx-auto overflow-hidden rounded-[14px] sm:h-[340px] lg:h-[360px]"
                >
                  {/* Full-bleed background image with warm gradient fallback */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.fallbackGradient}`}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-400 motion-safe:group-hover:scale-[1.04] motion-reduce:transform-none"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                  </div>

                  {/* Dark gradient overlay from transparent at the top to ~85% near-black at the bottom */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                    aria-hidden="true"
                  />

                  {/* Bottom-left content overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4.5 sm:p-5 text-left">
                    <h3 className="font-serif text-lg font-normal leading-snug text-white sm:text-xl md:text-[22px]">
                      {item.role}
                    </h3>
                    <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-white/85 sm:text-[13.5px]">
                      {item.description}
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-white/90 sm:text-[13px]">
                      <span>Learn more</span>
                      <svg
                        className="h-3.5 w-4 stroke-current transition-transform duration-300 motion-safe:group-hover:translate-x-1.5 motion-reduce:transform-none"
                        fill="none"
                        viewBox="0 0 16 12"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M1 6h14m-4-4l4 4-4 4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Connectivity Blue Band: Stats-band layout with halftone texture */}
        <section
          ref={connectivityRef}
          className="relative overflow-hidden bg-primary py-[88px] text-white"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        >
          {/* Faint large organic curved line shape at ~5% opacity */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-5 stroke-white"
            fill="none"
            viewBox="0 0 1440 380"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M-50,220 C250,60 550,340 920,140 C1250,-20 1420,270 1520,190"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Centered content with max-width ~1100px */}
          <div className="relative z-10 mx-auto max-w-[1100px] px-5 lg:px-8">
            <h2 className="-tracking-[0.01em] text-center font-serif text-3xl font-normal text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Works where connectivity doesn’t
            </h2>

            {/* Three columns matching stats-band layout */}
            <div className="mt-14 grid grid-cols-1 gap-12 sm:mt-16 md:grid-cols-3 md:gap-12">
              {connectivityItems.map((item) => (
                <div
                  key={item.text}
                  className={`flex flex-col items-center text-center transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                    isConnectivityVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  } ${item.delay}`}
                >
                  {/* Soft circular chip (white at 12% opacity) housing enlarged ~56px icon */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/12 text-white">
                    {item.icon}
                  </div>

                  {/* Centered item text in white sans-serif, ~20px, weight 600, line-height 1.35, max-width ~280px */}
                  <p className="mx-auto mt-6 max-w-[280px] font-sans text-lg font-semibold leading-[1.35] text-white sm:text-xl">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Frequently asked questions Section: Flashcards with expandable dropdown answers */}
        <section id="faq" className="scroll-mt-24 py-16 lg:py-24">
          <Container>
            <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl md:text-5xl">
              Frequently asked questions
            </h2>

            <div className="mt-8 space-y-3.5 sm:mt-10 sm:space-y-4">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}

