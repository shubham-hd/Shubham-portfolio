import { useEffect, useRef, useState, MouseEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  index: string
  title: string
  client: string
  year: string
  category: string
  description: string
  tags: string[]
  accent: string
  bg: string
}

const projects: Project[] = [
  {
    id: 'lumen',
    index: '01',
    title: 'Lumen OS',
    client: 'Lumen Inc.',
    year: '2026',
    category: 'Product · Motion',
    description:
      'A next-gen operating layer for creative teams. Designed the marketing system, motion language and a real-time canvas SDK used by 40k+ users.',
    tags: ['Brand', 'Motion', 'Product', 'WebGL'],
    accent: '#e8ff00',
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
  },
  {
    id: 'meridian',
    index: '02',
    title: 'Meridian.fi',
    client: 'Meridian Capital',
    year: '2025',
    category: 'Fintech · Brand',
    description:
      'Reimagined Meridian\'s public site and dashboard from the ground up. Cinematic 3D hero, custom typeface, +38% conversion in 90 days.',
    tags: ['Web', 'Brand', '3D', 'Type'],
    accent: '#ff5b3a',
    bg: 'linear-gradient(135deg, #2a1d18 0%, #0a0a0a 100%)'
  },
  {
    id: 'parallax',
    index: '03',
    title: 'Parallax Studio',
    client: 'Parallax',
    year: '2025',
    category: 'Brand · Site',
    description:
      'A directing collective wanted a portfolio that felt like a film. Built a custom scroll engine with reel-style transitions and an editorial CMS.',
    tags: ['Editorial', 'Film', 'Scroll'],
    accent: '#8b5cf6',
    bg: 'linear-gradient(135deg, #1a1428 0%, #0a0a0a 100%)'
  },
  {
    id: 'nordic',
    index: '04',
    title: 'Nordic Atlas',
    client: 'Nordic Atlas',
    year: '2024',
    category: 'Editorial · 3D',
    description:
      'An interactive long-form essay exploring the Arctic. Custom WebGL globe, scroll-triggered narrative, audio-reactive transitions.',
    tags: ['Editorial', 'WebGL', 'Audio'],
    accent: '#38bdf8',
    bg: 'linear-gradient(135deg, #0e1e2a 0%, #0a0a0a 100%)'
  },
  {
    id: 'olive',
    index: '05',
    title: 'Olive & Oak',
    client: 'Olive & Oak Co.',
    year: '2024',
    category: 'Commerce · Brand',
    description:
      'DTC home goods brand. Designed a flagship store with cinematic product pages, custom motion grammar and a +52% AOV lift.',
    tags: ['Commerce', 'Brand', 'Motion'],
    accent: '#84cc16',
    bg: 'linear-gradient(135deg, #1a1f0c 0%, #0a0a0a 100%)'
  },
  {
    id: 'oracle',
    index: '06',
    title: 'Oracle Labs',
    client: 'Oracle Research',
    year: '2024',
    category: 'AI · Product',
    description:
      'Built the public face of an AI research lab. A living manifesto, interactive demos, and a brand system that scales across whitepapers and web.',
    tags: ['AI', 'Product', 'Brand'],
    accent: '#f97316',
    bg: 'linear-gradient(135deg, #2a1a0d 0%, #0a0a0a 100%)'
  }
]

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const inner = innerRef.current
    if (!card || !inner) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y / rect.height) - 0.5) * -10
    const ry = ((x / rect.width) - 0.5) * 14
    gsap.to(inner, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.5,
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
      className="tilt-card relative h-[72vh] w-[78vw] md:w-[60vw] lg:w-[48vw] xl:w-[42vw] rounded-2xl overflow-hidden cursor-none"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="View case"
      style={{ background: project.bg }}
    >
      <div
        ref={innerRef}
        className="tilt-card-inner relative h-full w-full p-8 md:p-12 flex flex-col justify-between border border-white/10 rounded-2xl"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-300">
              Project · {project.index}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
              {project.category}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-300">
              Year
            </div>
            <div className="font-display text-2xl text-white">{project.year}</div>
          </div>
        </div>

        {/* Center — large title */}
        <div className="relative z-10 my-auto">
          <div
            className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tightest text-white"
            style={{ transform: 'translateZ(40px)' }}
          >
            {project.title}
          </div>
          <div
            className="mt-6 max-w-md text-ink-200 text-base md:text-lg leading-snug"
            style={{ transform: 'translateZ(20px)' }}
          >
            {project.description}
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative z-10 flex items-end justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full border border-white/15 text-[11px] uppercase tracking-wider text-ink-100/80 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 group">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
              View case
            </span>
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 group-hover:border-white transition-colors"
              style={{ background: project.accent + '20' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Accent glow */}
        <div
          className="absolute -top-32 -right-32 h-80 w-80 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: project.accent }}
        />
        <div className="tilt-card-shine" />
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      // Compute horizontal distance
      const getDistance = () => track.scrollWidth - window.innerWidth

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress)
        }
      })

      // Headline reveal as user enters
      const headWords = section.querySelectorAll<HTMLElement>('.work-head .split-word > span')
      gsap.set(headWords, { yPercent: 110 })
      gsap.to(headWords, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true
        }
      })

      return () => horizontalTween.kill()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-ink"
      style={{ minHeight: '100vh' }}
    >
      {/* Header strip — visible while pinned */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-10 pt-32 md:pt-36 pointer-events-none">
        <div className="work-head max-w-[1600px] mx-auto flex items-end justify-between gap-6 pointer-events-auto" ref={headRef}>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300 mb-3">
              <span className="text-accent">03</span> / Selected work
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tightest text-white">
              {'Recent projects'.split(/(\s+)/).map((w, i) =>
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
          <div className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-300">
            <span>
              {String(Math.min(projects.length, Math.floor(progress * projects.length) + 1)).padStart(2, '0')}
            </span>
            <span className="opacity-40">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div className="h-scroll-section">
        <div
          ref={trackRef}
          className="h-scroll-track items-center"
          style={{ paddingLeft: '6vw', paddingRight: '6vw' }}
        >
          {projects.map((p, i) => (
            <div className="h-scroll-panel" key={p.id} style={{ paddingRight: '3vw' }}>
              <ProjectCard project={p} idx={i} />
            </div>
          ))}

          {/* Closing panel */}
          <div className="h-scroll-panel" style={{ paddingRight: '8vw' }}>
            <div className="w-[60vw] md:w-[40vw] text-left">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300 mb-4">
                That's a wrap
              </div>
              <p className="font-display text-4xl md:text-6xl tracking-tighter text-white leading-[1]">
                40+ more case studies in the full archive.
              </p>
              <a
                href="#contact"
                data-cursor="Get archive"
                className="inline-flex items-center gap-3 mt-8 group"
              >
                <span className="font-display text-lg text-white group-hover:text-accent transition-colors">
                  Request the full archive
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 group-hover:border-accent group-hover:bg-accent group-hover:text-ink transition-all">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-6 md:px-10 pointer-events-none">
        <div className="max-w-[1600px] mx-auto flex items-center gap-6 pointer-events-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
            Drag · scroll
          </span>
          <div className="relative flex-1 h-px bg-white/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </section>
  )
}
