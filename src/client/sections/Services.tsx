import { useEffect, useRef, MouseEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: '◇',
    title: 'Product Design',
    description:
      'End-to-end product design — from zero-to-one strategy to detailed component systems.',
    bullets: ['Discovery & strategy', 'Design systems', 'Prototyping', 'Component libraries'],
    accent: '#e8ff00'
  },
  {
    icon: '∿',
    title: 'Motion & Interaction',
    description:
      'Cinematic motion direction, scroll narratives and micro-interactions that feel inevitable.',
    bullets: ['Motion language', 'GSAP / Lottie', 'Scroll storytelling', 'Prototype animation'],
    accent: '#ff5b3a'
  },
  {
    icon: '◈',
    title: 'Web Development',
    description:
      'Production-grade Next.js / React builds. Performance-obsessed, fully accessible, beautifully animated.',
    bullets: ['Next.js / React', 'WebGL / R3F', 'Headless CMS', 'A11y & performance'],
    accent: '#8b5cf6'
  },
  {
    icon: '⌗',
    title: 'Brand & Identity',
    description:
      'Type-led identities that bend at speed. Logo systems, motion brands, full visual languages.',
    bullets: ['Identity systems', 'Typography', 'Motion brand', 'Guidelines'],
    accent: '#38bdf8'
  }
]

function ServiceCard({
  s,
  i
}: {
  s: (typeof services)[number]
  i: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const inner = innerRef.current
    if (!card || !inner) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y / rect.height) - 0.5) * -14
    const ry = ((x / rect.width) - 0.5) * 14
    gsap.to(inner, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.4,
      ease: 'power3.out',
      transformPerspective: 1200
    })
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`)
  }

  const onLeave = () => {
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="service-card tilt-card relative rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-8 md:p-10 overflow-hidden h-full"
      data-cursor="Learn more"
    >
      <div ref={innerRef} className="tilt-card-inner relative h-full flex flex-col gap-8">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl font-display text-3xl"
            style={{ background: s.accent + '15', color: s.accent }}
          >
            {s.icon}
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-400">
            {String(i + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Title */}
        <div style={{ transform: 'translateZ(40px)' }}>
          <h3 className="font-display text-3xl md:text-4xl tracking-tighter text-white leading-tight">
            {s.title}
          </h3>
          <p className="mt-4 text-ink-200 leading-relaxed">{s.description}</p>
        </div>

        {/* Bullets */}
        <ul className="mt-auto space-y-2.5">
          {s.bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-3 text-sm text-ink-100/80 border-t border-white/5 pt-2.5"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: s.accent }}
              />
              {b}
            </li>
          ))}
        </ul>

        {/* Glow */}
        <div
          className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: s.accent }}
        />
        <div className="tilt-card-shine" />
      </div>
    </div>
  )
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      // Stagger card entrance
      gsap.from('.service-card', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.service-grid',
          start: 'top 75%',
          once: true
        }
      })

      const headWords = el.querySelectorAll<HTMLElement>('.svc-head .split-word > span')
      gsap.set(headWords, { yPercent: 110 })
      gsap.to(headWords, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.svc-head',
          start: 'top 85%',
          once: true
        }
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="services" className="relative py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="svc-head flex items-end justify-between gap-6 mb-20 md:mb-28 border-b border-white/10 pb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300 mb-3">
              <span className="text-accent">04</span> / Services
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tightest text-white">
              {'How I work.'.split(/(\s+)/).map((w, i) =>
                /\s+/.test(w) ? (
                  <span key={i}>{w}</span>
                ) : (
                  <span className="split-word" key={i}>
                    <span>{w}</span>
                  </span>
                )
              )}
            </h2>
          </div>
          <p className="hidden md:block max-w-sm text-ink-200 text-right">
            Engagements range from a one-week sprint to a multi-month embed. Pick what fits.
          </p>
        </div>

        {/* Grid */}
        <div className="service-grid grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>

        {/* Process */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2">
          {[
            { k: 'Discover', d: 'Audit, strategy, alignment' },
            { k: 'Define', d: 'System, principles, scope' },
            { k: 'Design', d: 'Iterate in code, not Figma' },
            { k: 'Deliver', d: 'Ship, measure, refine' }
          ].map((p, i) => (
            <div key={p.k} className="relative md:border-l md:first:border-l-0 border-white/10 md:pl-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
                STEP {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-display text-3xl text-white tracking-tighter">{p.k}</div>
              <div className="text-sm text-ink-300 mt-2">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
