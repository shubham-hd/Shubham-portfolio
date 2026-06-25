import { Hono } from 'hono'

const app = new Hono()

const TITLE = 'Shubham Sharma — Independent Design Engineer'
const DESC =
  'Shubham Sharma is an independent design engineer crafting cinematic interfaces, motion systems and zero-to-one product experiences for ambitious teams.'
const URL = 'https://shubhamsharma.dev'
const OG = '/static/og.png'

app.get('/', (c) => {
  return c.html(
    `<!DOCTYPE html>
<html lang="en" class="bg-black">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#0a0a0a" />
    <meta name="color-scheme" content="dark" />

    <title>${TITLE}</title>
    <meta name="description" content="${DESC}" />
    <meta name="author" content="Shubham Sharma" />
    <meta name="keywords" content="design engineer, creative developer, motion design, portfolio, GSAP, Framer Motion, brand engineer, web animation, product design" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${URL}" />
    <meta property="og:title" content="${TITLE}" />
    <meta property="og:description" content="${DESC}" />
    <meta property="og:image" content="${OG}" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${TITLE}" />
    <meta name="twitter:description" content="${DESC}" />
    <meta name="twitter:image" content="${OG}" />
    <meta name="twitter:creator" content="@shubhamsharma" />

    <link rel="canonical" href="${URL}" />
    <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />

    <!-- Preconnect / fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- App stylesheet -->
    <link rel="stylesheet" href="/static/client.css" />

    <!-- JSON-LD structured data -->
    <script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shubham Sharma',
  url: URL,
  jobTitle: 'Independent Design Engineer',
  worksFor: { '@type': 'Organization', name: 'Shubham Sharma Studio' },
  sameAs: [
    'https://twitter.com/shubhamsharma',
    'https://github.com/shubham-hd',
    'https://read.cv/shubhamsharma'
  ],
  description: DESC
})}
    </script>
  </head>
  <body>
    <div id="app-root"></div>
    <noscript>
      <div style="padding: 4rem; color: white; font-family: system-ui; max-width: 60ch;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">Shubham Sharma</h1>
        <p>Independent design engineer. This site uses JavaScript for its cinematic
        animations — please enable it to see the full experience.</p>
        <p>Get in touch: <a href="mailto:hello@shubhamsharma.dev" style="color: #e8ff00;">hello@shubhamsharma.dev</a></p>
      </div>
    </noscript>
    <script type="module" src="/static/client.js"></script>
  </body>
</html>`
  )
})

// Lightweight health endpoint
app.get('/api/health', (c) => c.json({ ok: true, time: new Date().toISOString() }))

export default app
