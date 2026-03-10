import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROFILE, ACTIVITIES } from '../../data/content'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const fade = (d = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay: d, ease: [0.16,1,0.3,1] },
  })

  return (
    <section id="about" ref={ref} style={{ padding: '7rem 0', background: 'var(--deep)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <motion.div {...fade(0)}>
              <div className="sec-tag">01 · About Me</div>
              <h2 className="sec-heading" style={{ marginBottom: '1.5rem' }}>
                Developer with a<br />
                <span style={{ color: 'var(--blue-bright)' }}>systems mindset.</span>
              </h2>
            </motion.div>
            {PROFILE.bio.map((p, i) => (
              <motion.p key={i} {...fade(0.15 + i * 0.1)} style={{
                fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--muted)', fontWeight: 300, marginBottom: '1rem',
              }}>{p}</motion.p>
            ))}

            {/* Quick links */}
            <motion.div {...fade(0.4)} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {[
                { label: 'GitHub',       href: PROFILE.links.github,    color: '#dde5f2' },
                { label: 'LinkedIn',     href: PROFILE.links.linkedin,   color: '#0a66c2' },
                { label: 'LeetCode',     href: PROFILE.links.leetcode,   color: '#ffa116' },
                { label: 'Portfolio v1', href: PROFILE.links.portfolio,  color: '#22d3ee' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.65rem' }}
                >
                  {l.label} ↗
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: What I'm doing */}
          <div>
            <motion.div {...fade(0.1)}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: '0.62rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(96,165,250,0.5)', marginBottom: '1.25rem',
              }}>
                Currently working on
              </div>
            </motion.div>

            {/* Freelance highlight */}
            <motion.div
              {...fade(0.2)}
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(34,211,238,0.04))',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 10,
                padding: '1.25rem 1.5rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)', color: '#22d3ee', borderRadius: 4, padding: '2px 8px' }}>
                  Ongoing
                </span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', color: 'rgba(126,141,168,0.5)' }}>First freelance project</span>
              </div>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--paper)', marginBottom: 4 }}>
                Full-Stack Online Learning Platform
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>
                Spring Boot backend, JWT auth, OTP verification, MySQL, payment module, React frontend.
              </div>
            </motion.div>

            {/* Activity list */}
            <motion.div {...fade(0.3)}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: '0.62rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(96,165,250,0.5)', marginBottom: '1rem', marginTop: '1.5rem',
              }}>
                What I do every day
              </div>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {ACTIVITIES.map((a, i) => (
                <motion.div
                  key={i}
                  {...fade(0.35 + i * 0.07)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '0.7rem 1rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <span style={{ fontSize: '0.95rem', flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{a.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
