import { wheelItems } from '../data/howItWorks.ts'

export function ReferralWheel() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      {/* Decorative backdrop circle behind the items */}
      <div className="absolute inset-[8%] rounded-full bg-sand" aria-hidden="true" />

      {/* Centred patient heartbeat emblem and title */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
        aria-hidden="true"
      >
        {/* Heartbeat pulse graphic: width is ~40% of container, using primary brand stroke */}
        <svg
          className="w-[40%] text-primary"
          viewBox="0 0 120 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 5 20 H 38 L 46 6 L 58 34 L 68 10 L 76 25 L 82 20 H 115" />
        </svg>
        <span className="mt-2 font-serif text-2xl italic text-ink md:text-3xl">
          The patient
        </span>
      </div>

      {/* Ring of items that travel with every referral case */}
      <ul
        aria-label="What travels with every referral"
        className="absolute inset-0 list-none"
      >
        {wheelItems.map((item, index) => {
          // Circle placement math for beginners:
          // 1. A full circle is 2 * PI radians. We divide it into 8 equal angles for the 8 items.
          // 2. Subtracting PI / 2 (90 degrees) rotates the starting point so item 0 lands squarely at the top (12 o'clock).
          // 3. Math.cos(angle) calculates the horizontal (X) ratio and Math.sin(angle) calculates the vertical (Y) ratio.
          // 4. Multiplying by 38 projects the items out to a 38% radius from the 50% midpoint of the container.
          const angle = (index / 8) * 2 * Math.PI - Math.PI / 2
          const left = 50 + 38 * Math.cos(angle)
          const top = 50 + 38 * Math.sin(angle)

          return (
            <li
              key={item.label}
              style={{ left: `${left}%`, top: `${top}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex aspect-square w-[22%] items-center justify-center rounded-full px-2 text-center text-xs font-medium leading-tight sm:text-sm md:text-base ${item.bg} ${item.text}`}
            >
              {item.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

