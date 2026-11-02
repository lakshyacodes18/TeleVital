import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

// Container keeps content aligned to the exact same left and right margins across the site
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-5 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

