import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitRevealProps {
  children: string
  as?: keyof JSX.IntrinsicElements
  className?: string
  /** stagger words instead of lines */
  byWord?: boolean
  delay?: number
  stagger?: number
  duration?: number
  start?: string
  /** Animate immediately without scroll trigger */
  immediate?: boolean
}

/**
 * Wraps text in masked spans and reveals them on scroll.
 * - byWord=false (default): splits by word but stays as one flowing line
 * - byWord=true: same, individual word stagger
 */
export default function SplitReveal({
  children,
  as: Tag = 'span',
  className = '',
  byWord = true,
  delay = 0,
  stagger = 0.06,
  duration = 1.0,
  start = 'top 85%',
  immediate = false
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = el.querySelectorAll('.split-word > span')
    if (!spans.length) return

    gsap.set(spans, { yPercent: 110 })

    const animate = () =>
      gsap.to(spans, {
        yPercent: 0,
        duration,
        delay,
        ease: 'expo.out',
        stagger
      })

    if (immediate) {
      animate()
      return
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: animate
    })

    return () => {
      st.kill()
    }
  }, [children, byWord, delay, stagger, duration, start, immediate])

  // Tokenize by word, preserving spaces
  const words = children.split(/(\s+)/)
  return (
    // @ts-ignore — dynamic tag
    <Tag ref={ref} className={className}>
      {words.map((w, i) =>
        /\s+/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span className="split-word" key={i}>
            <span>{w}</span>
          </span>
        )
      )}
    </Tag>
  )
}
