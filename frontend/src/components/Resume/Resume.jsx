import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Google Drive file ID
const DRIVE_FILE_ID = '1XVC2CFs0I1yplomyr7rC_2MNokMwwChr'
const RESUME_DOWNLOAD = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`
const RESUME_PREVIEW  = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`

export default function Resume() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const fade = (d = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay: d, ease: [0.16,1,0.3,1] },
  })

  return (
    <section id="resume" ref={ref} style={{ padding: '7rem 0', background: 'var(--void)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

        <motion.div {...fade(0)} style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="sec-tag" style={{ justifyContent: 'center' }}>Resume</div>
          <h2 className="sec-heading" style={{ textAlign: 'center' }}>
            My <span style={{ color: 'var(--blue-bright)' }}>resume.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--f-body)', fontSize: '0.95rem', color: 'var(--muted)',
            fontWeight: 300, lineHeight: 1.75, maxWidth: 460, margin: '0.75rem auto 0',
          }}>
            Download a copy or preview inline — no sign-in required.
          </p>
        </motion.div>

        <motion.div
          {...fade(0.18)}
          style={{
            maxWidth: 560, margin: '0 auto',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '2.5rem 2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
            boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* BG gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          {/* PDF icon */}
          <div style={{
            width: 64, height: 64, borderRadius: 14,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
            position: 'relative', zIndex: 1,
          }}>
            📄
          </div>

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--paper)', marginBottom: 6 }}>
              Adarsh R — Resume
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              Software Developer · PDF
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            <a
              href={RESUME_DOWNLOAD}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
            <a
              href={RESUME_PREVIEW}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Preview Resume
            </a>
          </div>

          <div style={{
            fontFamily: 'var(--f-mono)', fontSize: '0.58rem',
            letterSpacing: '0.1em', color: 'var(--faint)', textTransform: 'uppercase',
            position: 'relative', zIndex: 1,
          }}>
            Hosted on Google Drive · Opens in browser
          </div>
        </motion.div>

      </div>
    </section>
  )
}
