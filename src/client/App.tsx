import { useEffect, useState } from 'react'
import { useLenis } from './hooks/useLenis'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Projects from './sections/Projects'
import Services from './sections/Services'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  // Once preloader finishes, force ScrollTrigger refresh so pinned sections
  // measure with the now-visible layout.
  useEffect(() => {
    if (!ready) return
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })
  }, [ready])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />

      <Nav />

      <main className="relative">
        <Hero />

        <Marquee items={['Design Engineer', 'Motion Director', 'Independent Studio', 'India → Worldwide']} />

        <About />

        <Projects />

        <Marquee invert items={['Available Q2 · 2026', 'Now booking', 'Two spots', 'Selected engagements']} />

        <Services />

        <Contact />
      </main>

      <Footer />
    </>
  )
}
