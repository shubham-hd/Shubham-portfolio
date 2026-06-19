import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const obj = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        // exit animation
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: 'expo.inOut',
          onComplete: () => {
            setDone(true)
            onComplete()
          }
        })
      }
    })

    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(obj.val)
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, '0')
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`
      }
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  if (done) return null

  return (
    <div ref={rootRef} className="preloader" aria-hidden>
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col items-start gap-12">
        <div className="flex items-center justify-between w-full">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
            <span className="text-accent">●</span> Loading studio
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300 hidden md:block">
            Est · 2019
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div className="font-display text-mega leading-[0.9] tracking-tightest">
              <span ref={counterRef}>000</span>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-ink-400 pb-4">
              %
            </div>
          </div>
          <div className="relative h-px w-full bg-ink-700 overflow-hidden">
            <div
              ref={barRef}
              className="absolute inset-0 bg-accent origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
          <span>Compiling shaders</span>
          <span>Calibrating cinematics</span>
        </div>
      </div>
    </div>
  )
}
