import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { generateEnhancedMetadata } from '@/lib/seo';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';
import { HelpCircle, GraduationCap, Code, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateEnhancedMetadata({
  title: 'Frequently Asked Questions',
  description: 'Common questions about FloStudios.ai experiential learning programs, AI and robotics projects, GetRecruitedToday internships, and how to join our innovative educational community.',
  path: '/faq',
});

const faqs = [
  {
    question: "What is FloStudios.ai?",
    answer: "FloStudios.ai is the AI-focused creative learning division of Flomad Labs R&D. We provide experiential learning programs where students work on real AI and robotics projects like CAIPO, MoodChanger, Flo Travel, and RoboCollective. Our approach combines hands-on project work, AI tools, expert mentorship, and industry best practices to prepare the next generation of technology innovators."
  },
  {
    question: "How is FloStudios.ai different from traditional education?",
    answer: "We use experiential learning—you learn by doing real work on live projects that serve actual users. Instead of textbooks and exams, you'll use advanced AI tools (LLMs), participate in brainwriting sessions, work with industry mentors, and build production platforms. All sessions are recorded for review, and you work at your own pace with flexible scheduling."
  },
  {
    question: "What is the GetRecruitedToday program?",
    answer: "GetRecruitedToday is our internship and recruitment program that allows students to gain real-world experience on AI and robotics projects while building their portfolio. It's designed to help emerging talent get recruited by showcasing their work on actual platforms that matter. You'll work on projects across Education, Healthcare, Travel, and Space sectors."
  },
  {
    question: "What AI tools and technologies will I learn?",
    answer: "You'll gain hands-on experience with large language models (LLMs), AI-powered productivity tools like CAIPO, machine learning platforms, robotics systems, and the latest AI development frameworks. Our curriculum covers AI for education, healthcare applications, travel optimization, and space technology innovation."
  },
  {
    question: "Do I need coding experience to join?",
    answer: "Not necessarily! While some projects involve technical development, we have roles across content creation, research communication, video production, documentation, and technology storytelling. We match your skills and interests to appropriate projects. If you want to learn coding, we provide mentorship and resources to help you develop those skills."
  },
  {
    question: "How much does it cost to participate?",
    answer: "FloStudios.ai focuses on affordability—we provide quality learning without the high costs of traditional programs. Through GetRecruitedToday, you gain industry experience while building valuable skills. Contact us for current program details and opportunities."
  },
  {
    question: "What is the time commitment?",
    answer: "We offer flexibility! You can work at your own pace with asynchronous learning options. Recorded sessions are available 24/7, allowing you to balance education with other commitments. Whether you can commit 10 hours or 40 hours per week, we'll help you make progress."
  },
  {
    question: "What projects will I work on?",
    answer: "Current projects include: CAIPO.ai (wearable AI productivity assistant), MoodChanger.ai (AI mood management for people and pets), Flo Travel (AI-powered travel planning), RoboCollective (robot marketplace), and various initiatives across our four verticals: Education, Healthcare, Travel, and Space technology."
  },
  {
    question: "Will I get credit or recognition for my work?",
    answer: "Absolutely! All student work is properly attributed. You'll build a public portfolio showcasing your contributions to real platforms. Projects like CAIPO, MoodChanger, and Flo Travel proudly highlight that they were 'Built by Flo Students,' and you'll have tangible work to show future employers."
  },
  {
    question: "What is The Flo Frequency?",
    answer: "The Flo Frequency is our upcoming podcast exploring AI, robotics, creativity, and the future of technology. Season 1 will feature industry experts, innovative minds, and conversations about the intersection of learning and emerging tech. Students may have opportunities to contribute to podcast production."
  },
  {
    question: "What learning methodology do you use?",
    answer: "Our methodology includes: (1) Brainwriting exercises for collaborative ideation, (2) Advanced AI tools (LLMs) for enhanced productivity, (3) Recorded meetings for review and reflection, (4) Expert mentorship from Flomad Labs professionals, (5) Hands-on projects on real platforms, and (6) Project-based learning where concepts are immediately applied."
  },
  {
    question: "What industries do you work in?",
    answer: "We span four key verticals: Education (experiential learning platforms and AI education), Healthcare (AI-driven health innovations like MoodChanger), Travel (AI-powered travel planning with Flo Travel), and Space (space sector innovation and aerospace technology). This cross-vertical approach builds transferable skills."
  },
  {
    question: "Can I choose which projects I work on?",
    answer: "Yes! We match students to projects based on their interests, skills, and career goals. Whether you're passionate about healthcare AI, space tech, travel innovation, or educational platforms, we'll find the right fit. You can also explore multiple verticals to discover what excites you most."
  },
  {
    question: "How do I apply to join?",
    answer: "Visit flolabs.international/internships/ to apply for the GetRecruitedToday program. We'll discuss your interests, skills, and goals, then match you to appropriate projects and learning opportunities. The application process is straightforward and designed to understand how we can best support your growth."
  },
  {
    question: "What kind of support and mentorship is available?",
    answer: "You'll have direct access to industry professionals and researchers from Flomad Labs who provide guidance, feedback, and insights into emerging technologies. All sessions are recorded, and you can review materials anytime. We also have a collaborative community of fellow students working on similar challenges."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-[100dvh] relative overflow-x-hidden fade-in">
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: 'https://www.flostudios.ai' },
          { name: 'FAQ', url: 'https://www.flostudios.ai/faq' }
        ]} 
      />

      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 slide-up">
            <GlassCard className="inline-block px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 glow-effect" variant="secondary" blur="md">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">FREQUENTLY ASKED QUESTIONS</span>
              </div>
            </GlassCard>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 text-enhanced-strong px-2">
              Your Questions <span className="gradient-text-sky">Answered</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed px-4">
              Everything you need to know about FloStudios.ai experiential learning programs, 
              AI and robotics projects, and how to join our innovative educational community.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 sm:py-12 mb-8 sm:mb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, label: "About Us", count: 3 },
              { icon: <Code className="w-6 h-6" />, label: "Technology", count: 4 },
              { icon: <Users className="w-6 h-6" />, label: "Getting Started", count: 5 },
              { icon: <Zap className="w-6 h-6" />, label: "Learning", count: 3 }
            ].map((category) => (
              <GlassCard key={category.label} className="p-4 sm:p-6 text-center hover:scale-105 transition-all" variant="primary" blur="md">
                <div className="text-blue-400 mb-2 flex justify-center">{category.icon}</div>
                <div className="text-sm font-semibold text-foreground">{category.label}</div>
                <div className="text-xs text-foreground/60 mt-1">{category.count} questions</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-8 sm:py-12 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <GlassCard key={index} className="p-6 sm:p-8" variant="primary" blur="lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 text-enhanced-strong">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed text-enhanced-readable">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-sky-50/30 via-blue-50/20 to-transparent dark:from-slate-900/30 dark:via-slate-800/20 dark:to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <GlassCard className="p-8 sm:p-12" variant="primary" blur="lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 text-enhanced-strong">
              Still Have Questions?
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-enhanced-readable">
              We&apos;re here to help! Reach out to our team and we&apos;ll answer any questions 
              about our programs, projects, or how to get started with FloStudios.ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton variant="primary" size="lg" className="glow-effect">
                <Link href="/contact" className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Contact Us
                </Link>
              </GlassButton>
              <GlassButton variant="secondary" size="lg">
                <a href="https://flolabs.international/internships/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Apply to GetRecruitedToday
                </a>
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
