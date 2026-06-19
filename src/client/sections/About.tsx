import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const manifesto =
  "I build interfaces that feel inevitable. Each frame considered, each transition earning its weight. Software should move like a well-made film — confident, intentional, alive."

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Word-by-word color highlight pinned in viewport
      const words = el.querySelectorAll<HTMLElement>('.manifesto-word')
      gsap.set(words, { color: 'rgba(255,255,255,0.15)' })

      gsap.to(words, {
        color: '#ffffff',
        stagger: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.manifesto-block',
          start: 'top 65%',
          end: 'bottom 30%',
          scrub: 1
        }
      })

      // Sticky label + stats panel reveal
      gsap.from('.about-stat', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 80%',
          once: true
        }
      })

      // Eyebrow heading reveal
      const headLines = el.querySelectorAll<HTMLElement>('.about-head .split-word > span')
      if (headLines.length) {
        gsap.set(headLines, { yPercent: 110 })
        gsap.to(headLines, {
          yPercent: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: '.about-head',
            start: 'top 85%',
            once: true
          }
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  // Build manifesto with word spans
  const words = manifesto.split(/(\s+)/)

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section eyebrow */}
        <div className="about-head flex items-baseline justify-between gap-8 mb-24 md:mb-32 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
              <span className="text-accent">02</span> / About
            </span>
          </div>
          <div className="font-display text-3xl md:text-5xl tracking-tighter text-white text-right">
            {'A studio of one.'.split(/(\s+)/).map((w, i) =>
              /\s+/.test(w) ? (
                <span key={i}>{w}</span>
              ) : (
                <span className="split-word" key={i}>
                  <span>{w}</span>
                </span>
              )
            )}
          </div>
        </div>

        {/* Manifesto — scroll-scrubbed word color */}
        <div className="manifesto-block grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-3">
            <div className="md:sticky md:top-32 space-y-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
                <span className="text-accent">●</span> Manifesto
              </div>
              <p className="text-sm text-ink-300 leading-relaxed">
                Seven years of shipping products at the intersection of design and
                engineering. Now independent, working with a small list of teams who care
                about the details.
              </p>
              <div className="pt-4 border-t border-white/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-2">
                  Past lives
                </div>
                <ul className="space-y-1 text-sm text-white">
                  <li>Stripe — Brand Engineer</li>
                  <li>Linear — Design Engineer</li>
                  <li>Vercel — Motion Lead</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="md:col-span-9">
            <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter text-balance">
              {words.map((w, i) =>
                /\s+/.test(w) ? (
                  <span key={i}>{w}</span>
                ) : (
                  <span key={i} className="manifesto-word inline-block">
                    {w}
                  </span>
                )
              )}
            </p>

            {/* Stats */}
            <div className="about-stats mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { k: '07+', v: 'Years shipping' },
                { k: '62', v: 'Products launched' },
                { k: '11', v: 'Industry awards' },
                { k: '04', v: 'Continents reached' }
              ].map((s) => (
                <div key={s.v} className="about-stat border-t border-white/10 pt-6">
                  <div className="font-display text-5xl md:text-6xl text-white tracking-tightest">
                    {s.k}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400 mt-3">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
