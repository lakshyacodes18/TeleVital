// Single navigation link item
export type NavLinkItem = {
  label: string
  href: string
  soon?: boolean
}

// Group of links grouped under a single dropdown menu
export type NavGroup = {
  label: string
  items: NavLinkItem[]
}

// Navigation structure holding either single links or dropdown groups (TypeScript union type)
export const navigation: (NavLinkItem | NavGroup)[] = [
  {
    label: 'Services',
    items: [
      { label: 'Emergency referral', href: '#', soon: true },
      { label: 'Specialist advice', href: '#', soon: true },
      { label: 'Prescriptions', href: '#', soon: true },
      { label: 'Transfers and ambulance', href: '#', soon: true },
      { label: 'Follow-up care', href: '#', soon: true },
    ],
  },
  {
    label: 'Who it’s for',
    items: [
      { label: 'Nurses and ANMs', href: '/people' },
      { label: 'Medical officers', href: '/people' },
      { label: 'Specialists', href: '/people' },
      { label: 'District officers', href: '/people' },
    ],
  },
  {
    label: 'How it works',
    href: '/how',
  },
  {
    label: 'Locations',
    items: [
      { label: 'Find your hub', href: '#', soon: true },
      { label: 'Health centres', href: '#', soon: true },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Frequently asked questions', href: '/faq' },
      { label: 'Help guides', href: '#', soon: true },
      { label: 'Privacy notice', href: '/privacy', soon: true },
      { label: 'Grievance contact', href: '/grievance', soon: true },
    ],
  },
]

