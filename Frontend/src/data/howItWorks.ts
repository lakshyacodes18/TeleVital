export type Step = {
  number: string
  title: string
  text: string
}

export const steps: Step[] = [
  {
    number: '01',
    title: 'Record the case',
    text: 'The nurse or ANM enters symptoms and vitals in a few taps, in their own language.',
  },
  {
    number: '02',
    title: 'Alert a specialist',
    text: 'The right specialist is alerted at once, with the most urgent cases first.',
  },
  {
    number: '03',
    title: 'Get advice',
    text: 'Advice and prescriptions come back to the health centre, with a transfer plan if one is needed.',
  },
  {
    number: '04',
    title: 'Follow the patient',
    text: 'The case is followed to its outcome, with reminders for follow-up care.',
  },
]

export type WheelItem = {
  label: string
  bg: string
  text: string
}

// Exactly 8 items traveling with every referral using our palette colors
// Complete Tailwind class strings are written in full so Tailwind v4 detects them reliably
export const wheelItems: WheelItem[] = [
  { label: 'Symptoms', bg: 'bg-primary', text: 'text-white' },
  { label: 'Vitals', bg: 'bg-apricot', text: 'text-ink' },
  { label: 'ECG and photos', bg: 'bg-ink', text: 'text-white' },
  { label: 'Medicines given', bg: 'bg-primary-soft', text: 'text-primary-dark' },
  { label: 'Advice', bg: 'bg-primary-dark', text: 'text-white' },
  { label: 'Prescription', bg: 'bg-apricot', text: 'text-ink' },
  { label: 'Transfer plan', bg: 'bg-primary', text: 'text-white' },
  { label: 'Follow-up', bg: 'bg-primary-soft', text: 'text-primary-dark' },
]

