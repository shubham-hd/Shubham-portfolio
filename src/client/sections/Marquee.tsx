interface MarqueeProps {
  items: string[]
  invert?: boolean
}

export default function Marquee({ items, invert = false }: MarqueeProps) {
  const content = (
    <div className="marquee-track">
      {Array.from({ length: 2 }).flatMap((_, copy) =>
        items.map((item, i) => (
          <span
            key={`${copy}-${i}`}
            className="inline-flex items-center gap-8 px-8 font-display text-7xl md:text-9xl tracking-tightest leading-none"
          >
            <span>{item}</span>
            <span className={`inline-block h-3 w-3 rounded-full ${invert ? 'bg-ink' : 'bg-accent'}`} />
          </span>
        ))
      )}
    </div>
  )

  return (
    <div
      className={`marquee py-10 border-y ${
        invert ? 'bg-accent text-ink border-ink/20' : 'bg-ink text-white border-white/10'
      }`}
    >
      {content}
    </div>
  )
}
