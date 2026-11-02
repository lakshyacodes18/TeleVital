import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
}

// Flashcard accordion component displaying questions with expandable dropdown answers
export function FaqItem({ question, answer }: FaqItemProps) {
  // Local state keeps track of whether this individual question accordion is expanded
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-line/40 bg-card shadow-xs transition sm:rounded-2xl">
      <h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          // Informs screen readers whether the card's dropdown answer is revealed
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-cream/40 sm:px-7 sm:py-5.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="font-sans text-base font-medium text-ink sm:text-lg">
            {question}
          </span>

          {/* Minimalist down-chevron icon that rotates 180 degrees when open */}
          <svg
            className={`ml-4 h-5 w-5 shrink-0 text-ink transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </h3>

      {/* Dropdown panel displaying the answer inside the flashcard */}
      {isOpen && (
        <div className="px-6 pb-6 pt-1 sm:px-7 sm:pb-7">
          <p className="text-base leading-relaxed text-muted">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}
