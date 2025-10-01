import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | Flomad Studios",
  description: "Get in touch with Flomad Studios for technology content creation, AI & robotics projects, research communication, internships, and career change opportunities.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}