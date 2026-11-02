import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  // Local state keeps track of whether this individual question accordion is expanded
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-line py-5">
      <h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          // Informs screen readers about the disclosure state of the question answer
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="font-serif text-lg font-bold text-ink sm:text-xl">
            {question}
          </span>
          {/* Rotating chevron icon shows whether section is open or closed */}
          <span
            className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-ink transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>
      </h3>

      {/* Conditional rendering: answer paragraph only mounts when state is true */}
      {isOpen && (
        <div className="mt-3 pr-8">
          <p className="text-base leading-relaxed text-muted">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

