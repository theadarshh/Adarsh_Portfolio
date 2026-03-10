import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LEETCODE_STATS as S } from '../../data/content'

function Ring({ label, solved, total, color, delay, inView, size = 120 }) {
  const r    = (size / 2) - 8
  const circ = 2 * Math.PI * r
  const pct  = Math.min(solved / total, 1)
  const dash = circ * pct

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={5} />
          {/* Glow copy */}
          <motion.circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={color} strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - dash } : { strokeDashoffset: circ }}
            transition={{ duration: 1.6, delay, ease: [0.16,1,0.3,1] }}
            style={{ transform: `rotate(-90deg)`, transformOrigin: `${size/2}px ${size/2}px`, filter: `blur(5px)`, opacity: 0.45 }}
          />
          {/* Main arc */}
          <motion.circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={color} strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - dash } : { strokeDashoffset: circ }}
            transition={{ duration: 1.6, delay, ease: [0.16,1,0.3,1] }}
            style={{ transform: `rotate(-90deg)`, transformOrigin: `${size/2}px ${size/2}px` }}
          />
        </svg>
        {/* Center */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.6 }}
            style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: size < 130 ? '1.25rem' : '1.5rem', color, lineHeight: 1 }}
          >
            {solved}+
          </motion.span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.5rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>solved</span>
        </div>
      </div>
      <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</span>
    </div>
  )
}

export default function LeetCode() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="leetcode" ref={ref} style={{ padding: '7rem 0', background: 'var(--void)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="sec-tag">04 · LeetCode</div>
          <h2 className="sec-heading">
            Sharpening<br />
            <span style={{ color: 'var(--blue-bright)' }}>the edge.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>

          {/* Big number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          >
            <div style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 800,
              fontSize: 'clamp(5.5rem, 13vw, 9.5rem)',
              lineHeight: 0.85,
              color: 'var(--blue-bright)',
              filter: 'drop-shadow(0 0 50px rgba(96,165,250,0.3))',
              marginBottom: '0.75rem',
            }}>
              {S.totalSolved}+
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2rem' }}>
              Problems Solved
            </div>

            {/* Activity stats */}
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[
                { label: 'Active Days',     value: `${S.activeDays}+` },
                { label: 'Longest Streak',  value: `${S.longestStreak}d` },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--cyan)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.75rem' }}>
              <a href="https://leetcode.com/u/theadarshh/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                View Profile ↗
              </a>
            </div>
          </motion.div>

          {/* Rings */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Ring label="Easy"   solved={S.easySolved}   total={S.easyTotal}   color="#22c55e" delay={0.35} inView={inView} size={130} />
            <Ring label="Medium" solved={S.mediumSolved} total={S.mediumTotal} color="#f59e0b" delay={0.5}  inView={inView} size={130} />
            <Ring label="Hard"   solved={S.hardSolved}   total={S.hardTotal}   color="#ef4444" delay={0.65} inView={inView} size={130} />
          </div>
        </div>
      </div>
    </section>
  )
}
