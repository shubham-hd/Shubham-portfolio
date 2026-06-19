import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/New_York'
    })
  )

  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/New_York'
        })
      )
    }, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>('.cta-line > span')
      gsap.set(lines, { yPercent: 110 })
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          once: true
        }
      })

      gsap.from('.cta-meta', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          once: true
        }
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="contact"
      className="relative pt-32 md:pt-48 pb-12 overflow-hidden"
    >
      {/* Glow backdrop */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[60vh] w-[80vw] rounded-full bg-accent/10 blur-[160px]"
        aria-hidden
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300 mb-8">
          <span className="text-accent">05</span> / Get in touch
        </div>

        {/* Mega CTA */}
        <h2 className="font-display text-mega leading-[0.85] tracking-tightest text-white">
          <span className="cta-line block overflow-hidden">
            <span className="block">Have a project</span>
          </span>
          <span className="cta-line block overflow-hidden">
            <span className="block">
              <span className="font-serif-italic text-accent">in mind</span>
              <span className="text-accent">?</span>
            </span>
          </span>
        </h2>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="cta-meta text-xl md:text-2xl text-ink-200 leading-snug max-w-xl">
              I take on a small handful of new engagements each quarter. If you're building
              something ambitious, send a brief — I read every email personally.
            </p>

            <div className="cta-meta mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="mailto:hello@kaelvance.com"
                cursorLabel="Send email"
              >
                <span>hello@kaelvance.com</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <MagneticButton
                href="#"
                variant="outline"
                cursorLabel="Book"
              >
                <span>Book a 30-min intro</span>
              </MagneticButton>
            </div>
          </div>

          <div className="md:col-span-5 space-y-8">
            <div className="cta-meta border-t border-white/10 pt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-2">
                Local time
              </div>
              <div className="font-display text-3xl text-white">
                {time} <span className="text-ink-400 text-base">EST</span>
              </div>
            </div>

            <div className="cta-meta border-t border-white/10 pt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-2">
                Now booking
              </div>
              <div className="font-display text-2xl text-white">
                Q2 — Q3 · 2026
                <span className="ml-2 inline-block px-2 py-0.5 bg-accent text-ink text-xs font-mono uppercase tracking-wider rounded-full align-middle">
                  2 spots
                </span>
              </div>
            </div>

            <div className="cta-meta border-t border-white/10 pt-6 space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400 mb-2">
                Find me
              </div>
              {[
                { l: 'Twitter / X', h: 'https://twitter.com', v: '@kaelvance' },
                { l: 'Read.cv', h: 'https://read.cv', v: '/kaelvance' },
                { l: 'GitHub', h: 'https://github.com', v: '/kaelvance' },
                { l: 'Are.na', h: 'https://are.na', v: '/kael-vance' }
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  data-cursor="Open"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border-b border-white/5 pb-2 text-sm text-white hover:text-accent transition-colors group"
                >
                  <span className="text-ink-300 group-hover:text-white transition-colors">
                    {s.l}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    {s.v}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
