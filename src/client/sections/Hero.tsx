import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      // Initial entrance — masked text reveal
      const lines = el.querySelectorAll<HTMLElement>('.hero-line > span')
      gsap.set(lines, { yPercent: 110 })

      const tl = gsap.timeline({ delay: 0.2 })
      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
        .to(
          lines,
          {
            yPercent: 0,
            duration: 1.4,
            stagger: 0.12,
            ease: 'expo.out'
          },
          '-=0.6'
        )
        .to(
          '.hero-meta',
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'expo.out' },
          '-=0.8'
        )
        .to(
          '.hero-cta',
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
          '-=0.6'
        )

      // Scroll-out parallax (only target elements that exist)
      gsap.to('.hero-content', {
        yPercent: -30,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden pt-24 pb-12 flex items-center"
    >
      {/* Background grid */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden />
      <div
        className="absolute -top-40 -right-40 h-[60vh] w-[60vh] rounded-full bg-accent/20 blur-[140px]"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-40 h-[50vh] w-[50vh] rounded-full bg-purple-500/10 blur-[120px]"
        aria-hidden
      />

      <div className="hero-content relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 w-full">
        {/* Eyebrow */}
        <div
          className="hero-eyebrow flex items-center gap-4 mb-12 opacity-0 translate-y-4 font-mono text-xs uppercase tracking-[0.3em] text-ink-300"
        >
          <span className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping" />
              <span className="relative rounded-full h-2 w-2 bg-accent" />
            </span>
            Independent design engineer
          </span>
          <span className="hidden md:inline opacity-50">/</span>
          <span className="hidden md:inline">Brooklyn → Worldwide</span>
        </div>

        {/* Massive title */}
        <h1 className="font-display tracking-tightest leading-[0.85] text-hero text-white">
          <span className="hero-line block overflow-hidden">
            <span className="block">Design</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">
              <span className="font-serif-italic text-accent">engineered</span>
            </span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">for impact.</span>
          </span>
        </h1>

        {/* Meta row */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-5">
            <p className="hero-meta opacity-0 translate-y-4 text-lg md:text-xl text-ink-200 max-w-lg leading-snug">
              I'm <span className="text-white font-medium">Kael Vance</span> — an independent
              design engineer crafting cinematic interfaces, motion systems and zero-to-one
              product experiences for ambitious teams.
            </p>
          </div>
          <div className="md:col-span-3 hero-meta opacity-0 translate-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-2">
              Currently
            </div>
            <div className="text-white">
              Building <span className="text-accent">Lumen OS</span>
              <br />
              <span className="text-ink-300">Director of Design</span>
            </div>
          </div>
          <div className="md:col-span-4 hero-cta opacity-0 translate-y-4 flex flex-wrap items-center gap-3 md:justify-end">
            <MagneticButton href="#work" cursorLabel="View work">
              <span>See selected work</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" cursorLabel="Say hi">
              <span>Get in touch</span>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom row: scroll indicator + stats */}
        <div className="mt-20 md:mt-28 flex items-end justify-between gap-8">
          <div className="hero-meta opacity-0 translate-y-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
            <span className="relative inline-block h-8 w-px bg-ink-400 overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-3 bg-white animate-[float_2s_ease-in-out_infinite]" />
            </span>
            Scroll to explore
          </div>

          <div className="hero-meta opacity-0 translate-y-4 hidden md:grid grid-cols-3 gap-12 text-right">
            <div>
              <div className="font-display text-3xl text-white">07+</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 mt-1">
                Yrs shipping
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-white">62</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 mt-1">
                Products launched
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-white">11</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 mt-1">
                Industry awards
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
