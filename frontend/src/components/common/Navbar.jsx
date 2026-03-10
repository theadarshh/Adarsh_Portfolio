import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(3,5,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(24,32,53,0.9)' : 'none',
        transition: 'all 0.35s cubic-bezier(.16,1,.3,1)',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex justify-between items-center h-[68px]">
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, var(--blue-dim), var(--blue))',
            borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: '0.9rem', color: '#fff',
            letterSpacing: '0.03em',
          }}>AR</div>
          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--paper)' }}>
            Adarsh<span style={{ color: 'var(--blue-bright)' }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                transition: 'color .2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--blue-bright)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#contact" className="btn-primary hidden md:inline-flex" style={{ padding: '0.5rem 1.2rem', fontSize: '0.65rem' }}>
          Hire Me ↗
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(o => !o)}
          style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 6, background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 20, height: 1.5, background: 'var(--muted)',
              transition: 'all .25s',
              transform: open ? (i===0 ? 'rotate(45deg) translateY(6px)' : i===2 ? 'rotate(-45deg) translateY(-6px)' : 'scaleX(0)') : 'none',
              opacity: open && i===1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(6,10,18,0.97)', borderTop: '1px solid var(--border)', overflow: 'hidden' }}
            className="md:hidden"
          >
            <div style={{ padding: '1.5rem 1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--paper)', textDecoration: 'none' }}>
                  {l.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary" style={{ marginTop: 4, justifyContent: 'center' }}>Hire Me ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
