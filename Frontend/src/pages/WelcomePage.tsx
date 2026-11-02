import { Link } from 'react-router-dom'
import { Container } from '../components/Container.tsx'
import { TopBar } from '../components/TopBar.tsx'
import { Footer } from '../components/Footer.tsx'
import { FaqItem } from '../components/FaqItem.tsx'

export default function WelcomePage() {
  // Checklist items for the Hero section
  const heroChecklist = [
    'A city specialist on every referral',
    'Care within minutes, not hours',
    'Works on the phones you already have',
    'Built for nurses and ANMs, in your language',
    'One record that follows the patient',
  ]

  // Steps for the 'How it works' section
  const steps = [
    {
      number: '1',
      title: 'Record',
      description:
        'The nurse or ANM enters symptoms and vitals in a few taps, in their own language.',
    },
    {
      number: '2',
      title: 'Alert',
      description:
        'The right specialist is alerted at once, with the most urgent cases first.',
    },
    {
      number: '3',
      title: 'Advise',
      description:
        'Advice, prescriptions and a transfer plan come back to the health centre, and the case is followed to its outcome.',
    },
  ]

  // Roles for the 'Built for the people who use it' section
  const roles = [
    {
      role: 'For nurses and ANMs',
      description:
        'Guided prompts and local language inputs make case entry clear without adding complex paperwork.',
    },
    {
      role: 'For medical officers',
      description:
        'Obtain timely specialist second opinions to make confident decisions on treatment and transfers.',
    },
    {
      role: 'For specialists',
      description:
        'Review triage-sorted patient vitals quickly and guide frontline teams directly from your clinic.',
    },
    {
      role: 'For district officers',
      description:
        'Track referral activity and clinical follow-up across centres with transparent case summaries.',
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
        {/* 1. Hero Section */}
        <section className="py-10 lg:py-16">
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Left Column: Sand panel with value proposition and calls to action */}
              <div className="rounded-2xl bg-sand p-6 sm:p-10 lg:p-12">
                {/* Main headline with serif font and exactly one italic word */}
                <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                  Specialist care, within <span className="italic text-primary">minutes</span>, at every health centre.
                </h1>

                {/* Checklist with circular tick marks */}
                <ul className="mt-8 space-y-4">
                  {heroChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      {/* Blue circular badge containing an SVG tick mark */}
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white"
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
                      <span className="text-base text-ink sm:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Call-to-action buttons */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-medium text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Send a referral
                  </Link>
                  <a
                    href="#how"
                    className="inline-flex items-center justify-center rounded-full border border-line bg-card px-7 py-3.5 text-base font-medium text-ink transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Find your hub
                  </a>
                </div>
              </div>

              {/* Right Column: Rounded-top arch architectural photo placeholder */}
              <div className="flex justify-center">
                {/* Outer arch in apricot tone */}
                <div className="w-full max-w-md rounded-t-[140px] bg-apricot p-4 sm:rounded-t-[180px]">
                  {/* Inner arch in lighter sand tone */}
                  <div className="flex h-80 w-full items-center justify-center rounded-t-[120px] bg-sand sm:h-96 sm:rounded-t-[160px] lg:h-[420px]">
                    <span className="text-base font-medium text-muted">
                      Photo placeholder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. How it works Section */}
        <section id="how" className="scroll-mt-24 py-12 lg:py-20">
          <Container>
            <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
              How it works
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col rounded-2xl border border-line bg-card p-6 sm:p-8"
                >
                  {/* Number indicator inside a soft blue circle */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-lg font-bold text-primary">
                    {step.number}
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. Built for the people who use it Section */}
        <section id="people" className="scroll-mt-24 py-12 lg:py-20">
          <Container>
            <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
              Built for the people who use it
            </h2>

            {/* Plain rows separated by thin lines, strictly avoiding cards */}
            <div className="mt-10 divide-y divide-line border-y border-line">
              {roles.map((item) => (
                <div
                  key={item.role}
                  className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8"
                >
                  <h3 className="font-serif text-xl font-bold text-ink md:w-1/3">
                    {item.role}
                  </h3>
                  <p className="text-base leading-relaxed text-muted md:w-2/3">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 4. Connectivity Blue Band */}
        <section className="bg-primary py-14 text-white lg:py-20">
          <Container>
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Works where connectivity doesn’t
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Point 1: Offline syncing */}
              <div className="flex items-start gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white"
                  aria-hidden="true"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </span>
                <p className="text-base font-medium leading-snug text-white sm:text-lg">
                  Saved on the device and sent when signal returns
                </p>
              </div>

              {/* Point 2: Phone hub desk */}
              <div className="flex items-start gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white"
                  aria-hidden="true"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>
                <p className="text-base font-medium leading-snug text-white sm:text-lg">
                  One tap to phone the hub desk
                </p>
              </div>

              {/* Point 3: Compatibility */}
              <div className="flex items-start gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white"
                  aria-hidden="true"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                </span>
                <p className="text-base font-medium leading-snug text-white sm:text-lg">
                  Runs on the phones you already have
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 5. Common questions Section */}
        <section id="faq" className="scroll-mt-24 py-12 lg:py-20">
          <Container>
            <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
              Common questions
            </h2>

            <div className="mt-8 divide-y-0">
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

