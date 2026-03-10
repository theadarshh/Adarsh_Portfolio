/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', '"Cabinet Grotesk"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        body: ['"Satoshi"', 'sans-serif'],
      },
      colors: {
        void: '#04060f',
        deep: '#080d1a',
        surface: '#0d1424',
        card: '#111927',
        border: '#1a2540',
        blue: {
          glow: '#3b82f6',
          bright: '#60a5fa',
          dim: '#1d4ed8',
          ghost: 'rgba(59,130,246,0.08)',
        },
        paper: '#e8edf5',
        muted: '#8896b0',
        accent: '#38bdf8',
      },
    },
  },
  plugins: [],
}
