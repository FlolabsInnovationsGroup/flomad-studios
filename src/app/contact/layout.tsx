import { Metadata } from 'next'
import { generateEnhancedMetadata } from '@/lib/seo'

export const metadata: Metadata = generateEnhancedMetadata({
  title: 'Contact Us | FloStudios.ai',
  description: 'Get in touch with FloStudios.ai for technology content creation, AI & robotics projects, research communication, internships, and career change opportunities.',
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
