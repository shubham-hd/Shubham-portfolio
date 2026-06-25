import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const letters = el.querySelectorAll<HTMLElement>('.foot-mega .letter')
      if (!letters.length) return
      gsap.set(letters, { yPercent: 110 })
      gsap.to(letters, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true
        }
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const word = 'SHUBHAM · SHARMA'.split('')

  return (
    <footer ref={ref} className="relative bg-ink border-t border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-16">
        {/* Mini footer nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-4">
              Studio
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="#work" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">Selected work</a></li>
              <li><a href="#about" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">About</a></li>
              <li><a href="#services" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">Services</a></li>
              <li><a href="#contact" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-4">
              Notes
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" data-cursor="Read" className="text-ink-200 hover:text-white transition-colors">Designing for motion</a></li>
              <li><a href="#" data-cursor="Read" className="text-ink-200 hover:text-white transition-colors">Type at speed</a></li>
              <li><a href="#" data-cursor="Read" className="text-ink-200 hover:text-white transition-colors">The studio reading list</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-4">
              Elsewhere
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://read.cv" target="_blank" rel="noreferrer" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">Read.cv</a></li>
              <li><a href="https://are.na" target="_blank" rel="noreferrer" data-cursor="Open" className="text-ink-200 hover:text-white transition-colors">Are.na</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-4">
              Newsletter
            </div>
            <p className="text-sm text-ink-300 mb-4">
              One short letter a month. New work, field notes, no spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border-b border-white/15 pb-2 focus-within:border-accent transition-colors"
            >
              <input
                type="email"
                placeholder="you@studio.com"
                className="bg-transparent flex-1 text-sm text-white placeholder:text-ink-400 outline-none"
              />
              <button
                type="submit"
                data-cursor="Subscribe"
                className="text-accent text-sm font-mono uppercase tracking-wider"
              >
                Send →
              </button>
            </form>
          </div>
        </div>

        {/* Mega wordmark */}
        <div className="foot-mega relative select-none">
          <div className="font-display text-[13.5vw] leading-[0.85] tracking-tightest text-white whitespace-nowrap overflow-hidden">
            {word.map((c, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="letter inline-block">
                  {c === ' ' ? '\u00A0' : c}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-8 border-t border-white/10 mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            All systems nominal
          </div>
          <div className="flex items-center gap-6">
            <span>© 2026 Shubham Sharma Studio</span>
            <span className="hidden md:inline">India → Worldwide</span>
            <a href="#" data-cursor="Open" className="hover:text-white transition-colors">Colophon</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
