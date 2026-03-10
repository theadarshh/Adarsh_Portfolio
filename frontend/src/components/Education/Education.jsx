import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EDUCATION } from '../../data/content'

const LEVEL_COLORS = {
  'University':     'var(--blue-bright)',
  'Pre-University': '#f59e0b',
  'School':         '#a78bfa',
}

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" ref={ref} style={{ padding: '7rem 0', background: 'var(--void)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="sec-tag">06 · Education</div>
          <h2 className="sec-heading">
            Academic<br />
            <span style={{ color: 'var(--blue-bright)' }}>journey.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 10,
            top: 8,
            bottom: 8,
            width: 1,
            background: 'linear-gradient(180deg, var(--blue-dim), var(--border), transparent)',
          }} />

          {EDUCATION.map((edu, i) => {
            const dotColor = LEVEL_COLORS[edu.level] || 'var(--blue)'
            return (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16,1,0.3,1] }}
                style={{ position: 'relative', marginBottom: i < EDUCATION.length - 1 ? '2.5rem' : 0 }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: -27,
                  top: 6,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'var(--void)',
                  border: `2px solid ${dotColor}`,
                  boxShadow: `0 0 10px ${dotColor}50`,
                  zIndex: 1,
                }} />
                {/* Dot inner */}
                <div style={{
                  position: 'absolute',
                  left: -22,
                  top: 11,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: dotColor,
                  zIndex: 2,
                }} />

                {/* Card */}
                <div
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    padding: '1.5rem 1.75rem',
                    transition: 'border-color .25s, background .25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = dotColor + '40'
                    e.currentTarget.style.background = 'var(--card-hover)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'var(--card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: '0.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: dotColor,
                      background: dotColor + '10',
                      border: `1px solid ${dotColor}25`,
                      borderRadius: 4,
                      padding: '2px 8px',
                    }}>
                      {edu.level}
                    </span>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', color: 'var(--faint)', letterSpacing: '0.08em' }}>
                      {edu.period}
                    </span>
                  </div>

                  <div style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: 'var(--paper)',
                    lineHeight: 1.2,
                    marginBottom: '0.25rem',
                  }}>
                    {edu.degree}{edu.field && ` — ${edu.field}`}
                  </div>

                  <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.88rem', color: 'var(--blue-bright)', fontStyle: 'italic', marginBottom: 4 }}>
                    {edu.institution}
                  </div>

                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', color: 'var(--faint)', letterSpacing: '0.06em' }}>
                    {edu.location}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
