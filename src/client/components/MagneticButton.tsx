import { useRef, useEffect, ReactNode, MouseEvent } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'solid' | 'outline'
  strength?: number
  cursorLabel?: string
}

/**
 * Button that magnetically pulls toward the cursor on hover.
 * Pure GSAP for sub-pixel smoothness.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'solid',
  strength = 0.35,
  cursorLabel = 'Click'
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const btnRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const btn = btnRef.current
    const label = labelRef.current
    if (!wrap || !btn) return

    const onMove = (e: globalThis.MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: 'power3.out'
      })
      if (label) {
        gsap.to(label, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.6,
          ease: 'power3.out'
        })
      }
    }
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
      if (label) gsap.to(label, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
    }

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  const classes = `magnetic-btn ${variant === 'outline' ? 'magnetic-btn--outline' : ''} ${className}`

  const inner = (
    <span ref={labelRef as any} className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  )

  return (
    <span ref={wrapRef} className="inline-block" style={{ display: 'inline-block' }}>
      {href ? (
        <a
          ref={btnRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={classes}
          data-cursor={cursorLabel}
          onClick={onClick}
        >
          {inner}
        </a>
      ) : (
        <button
          ref={btnRef as React.RefObject<HTMLButtonElement>}
          type="button"
          className={classes}
          data-cursor={cursorLabel}
          onClick={onClick}
        >
          {inner}
        </button>
      )}
    </span>
  )
}
