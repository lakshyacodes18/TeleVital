import { Link } from 'react-router-dom'
import { Container } from './Container.tsx'
import { ReferralWheel } from './ReferralWheel.tsx'
import { steps } from '../data/howItWorks.ts'

export function HowItWorksSection() {
  return (
    <section id="how" className="scroll-mt-24 bg-cream py-20 lg:py-28">
      <Container>
        {/* Centred editorial section title */}
        <h2 className="text-center font-serif text-4xl font-normal text-ink md:text-5xl">
          How it works
        </h2>

        {/* Descriptive subtitle explaining the referral process */}
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-ink">
          Getting specialist advice should not feel complicated. Here is how a referral works, from the first tap to the final outcome.
        </p>

        {/* Two-column responsive layout: numbered steps on left, circular diagram on right */}
        <div className="mt-14 grid items-center gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Numbered workflow steps */}
          <div>
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number}>
                  <h3 className="font-sans text-3xl font-medium text-ink">
                    <span className="mr-3 text-primary">{step.number}</span>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg text-ink">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Action buttons under the steps */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Send a referral
              </Link>
              <a
                href="#people"
                className="inline-flex items-center justify-center rounded-full bg-sand px-8 py-4 text-lg font-semibold text-ink transition hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Learn about our services
              </a>
            </div>
          </div>

          {/* Right Column: Visual referral wheel diagram */}
          <div>
            <ReferralWheel />
          </div>
        </div>
      </Container>
    </section>
  )
}

