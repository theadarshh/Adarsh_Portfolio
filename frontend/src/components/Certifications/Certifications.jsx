import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CERTIFICATIONS } from '../../data/content'

export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="certifications" ref={ref} style={{ padding: '7rem 0', background: 'var(--deep)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="sec-tag">07 · Certifications</div>
          <h2 className="sec-heading">
            Credentials &<br />
            <span style={{ color: 'var(--blue-bright)' }}>recognition.</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
        }}>
          {CERTIFICATIONS.map((cert, i) => (
            <motion.a
              key={cert.name}
              href={cert.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                transition: 'all 0.25s',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = cert.color + '35'
                e.currentTarget.style.background = cert.color + '06'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 12px 28px rgba(0,0,0,0.3), 0 0 20px ${cert.color}10`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--card)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Left accent bar */}
              <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: `linear-gradient(180deg, ${cert.color}, transparent)`, flexShrink: 0 }} />

              {/* Icon */}
              <div style={{
                width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                background: cert.color + '12',
                border: `1px solid ${cert.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {cert.icon ? (
                  <i className={`${cert.icon} colored`} style={{ fontSize: '1.2rem' }} />
                ) : (
                  <span style={{ fontSize: '1.1rem' }}>{cert.emoji}</span>
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: cert.color,
                  marginBottom: 5,
                }}>
                  {cert.issuer} · {cert.year}
                </div>
                <div style={{
                  fontFamily: 'var(--f-body)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  color: 'var(--paper)',
                  lineHeight: 1.4,
                }}>
                  {cert.name}
                </div>
              </div>

              {/* External link indicator */}
              <div style={{ flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(126,141,168,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
