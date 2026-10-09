import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import ProjectSection from '../components/ProjectSection'
import WhyJoinSection from '../components/WhyJoinSection'
import CareersSection from '../components/CareersSection'
import SkillsSection from '../components/SkillsSection'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectSection />
      <WhyJoinSection />
      <CareersSection />
      <SkillsSection />
      <CTASection />
    </main>
  )
}
