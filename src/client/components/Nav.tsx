import { useEffect, useState } from 'react'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) return
    const lenis = (window as any).__lenis
    if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[2000] transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-ink/70 backdrop-blur-xl border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <nav className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <a
            href="#hero"
            data-cursor="Top"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#hero')
            }}
            className="flex items-center gap-3 group"
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-ink" />
            </span>
            <span className="font-display text-base tracking-tight">
              Kael<span className="text-accent">.</span>Vance
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-2 py-1.5 backdrop-blur">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor={l.label}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(l.href)
                  }}
                  className="relative inline-flex items-center px-4 py-2 text-sm text-ink-100/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-300">
              <span className="text-accent">●</span> Available · ‘26
            </span>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            data-cursor="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-px w-6 bg-white transition-transform ${
                open ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-transform ${
                open ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[1900] bg-ink/95 backdrop-blur-xl transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-28 px-8 gap-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor={l.label}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(l.href)
              }}
              className="font-display text-5xl tracking-tighter text-white border-b border-white/10 pb-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
