import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  inverted?: boolean
}

// Reusable logo component pairing serif extra-bold 'Tele' with sans normal 'Vital'
export function Logo({ className = '', inverted = false }: LogoProps) {
  const colorClass = inverted ? 'text-white' : 'text-primary'

  return (
    <Link
      to="/"
      className={`inline-flex items-baseline text-3xl tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${colorClass} ${className}`}
    >
      {/* Serif brand prefix */}
      <span className="font-serif font-extrabold">Tele</span>
      {/* Sans brand suffix */}
      <span className="font-sans font-normal">Vital</span>
    </Link>
  )
}

