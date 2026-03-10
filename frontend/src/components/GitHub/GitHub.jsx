import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROFILE } from '../../data/content'

const REPOS = [
  { name: 'Jay-s-Mentor',                desc: 'Mentorship platform — full stack web application' },
  { name: 'ReDiscoverU',                 desc: 'Freelance e-learning platform (Spring Boot + React)' },
  { name: 'hirely-job-portal',           desc: 'Job portal with listings, applications & auth' },
  { name: 'Jay-s-Website',               desc: 'Personal website project' },
  { name: 'Practice',                    desc: 'DSA practice — algorithms & data structures in Java' },
  { name: 'Sweet-Bite',                  desc: 'Food delivery app — REST API backend' },
  { name: 'Portfolio_Website',           desc: 'Personal portfolio — React + Spring Boot' },
  { name: 'openclaw',                    desc: 'Open-source contribution project' },
  { name: 'commons-lang',                desc: 'Apache Commons Lang — open-source exploration' },
  { name: 'Dal-Adulteration-Detection',  desc: 'YOLO-based grain adulteration detection (~92% acc.)' },
  { name: 'Magical_Arena',               desc: 'Turn-based game simulation in Java' },
  { name: 'Snack-Pack',                  desc: 'Snack ordering mini-application' },
]

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--muted)', flexShrink: 0 }}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function RepoCard({ repo, delay, inView }) {
  const repoUrl = `https://github.com/theadarshh/${repo.name}`
  return (
    <motion.a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16,1,0.3,1] }}
      style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '1.1rem 1.25rem',
        textDecoration: 'none',
        transition: 'border-color 0.22s, background 0.22s, transform 0.22s, box-shadow 0.22s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.38)'
        e.currentTarget.style.background = 'rgba(59,130,246,0.04)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.3), 0 0 18px rgba(59,130,246,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background = 'var(--card)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <GitHubIcon />
          <span style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--blue-bright)',
            letterSpacing: '0.02em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {repo.name}
          </span>
        </div>
        {/* External link arrow */}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
          <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </div>
      {/* Description */}
      <p style={{
        fontFamily: 'var(--f-body)', fontSize: '0.78rem', color: 'var(--muted)',
        lineHeight: 1.55, fontWeight: 300, margin: 0,
      }}>
        {repo.desc}
      </p>
      {/* Bottom accent */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, rgba(59,130,246,0.5), transparent)',
      }} />
    </motion.a>
  )
}

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="github" ref={ref} style={{ padding: '7rem 0', background: 'var(--deep)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="sec-tag">05 · GitHub</div>
          <h2 className="sec-heading">
            Code in the<br />
            <span style={{ color: 'var(--blue-bright)' }}>open.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--f-body)', fontSize: '0.95rem', color: 'var(--muted)',
            fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginTop: '0.75rem',
          }}>
            A selection of repositories spanning backend systems, open-source contributions, and full-stack projects.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.9rem' }}>
          {REPOS.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} delay={i * 0.055} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85 }}
          style={{ marginTop: '2rem', textAlign: 'center' }}
        >
          <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View Full GitHub Profile ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
