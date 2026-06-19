/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/client/**/*.{ts,tsx,html}', './src/index.tsx'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#c4c4c4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0a0a0a',
          950: '#050505'
        },
        accent: {
          DEFAULT: '#e8ff00',
          glow: '#d4ff00'
        }
      },
      fontFamily: {
        display: ['"Clash Display"', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif']
      },
      fontSize: {
        'hero': 'clamp(4rem, 16vw, 20rem)',
        'mega': 'clamp(3rem, 12vw, 15rem)',
        'huge': 'clamp(2.5rem, 8vw, 9rem)'
      },
      letterSpacing: {
        'tightest': '-0.07em',
        'tighter2': '-0.05em'
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    }
  },
  plugins: []
}
