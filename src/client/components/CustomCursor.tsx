import { useEffect, useRef, useState } from 'react'

/**
 * Premium custom cursor:
 *  - tiny dot follows pointer immediately
 *  - large ring lerps behind with momentum
 *  - grows + shows label when hovering elements with [data-cursor]
 *  - hidden on touch devices
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: mouse.x, y: mouse.y }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    // Use event delegation for hover detection
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const cursorEl = target.closest<HTMLElement>('[data-cursor]')
      if (cursorEl) {
        const label = cursorEl.dataset.cursor || ''
        if (labelRef.current) labelRef.current.textContent = label
        setHovering(true)
      } else {
        setHovering(false)
      }
    }

    let raf = 0
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b
    const tick = () => {
      ringPos.x = lerp(ringPos.x, mouse.x, 0.18)
      ringPos.y = lerp(ringPos.y, mouse.y, 0.18)
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor cursor-dot" aria-hidden />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'is-hovering' : ''} ${clicking ? 'is-clicking' : ''}`}
        aria-hidden
      >
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  )
}
