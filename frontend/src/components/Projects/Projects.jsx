import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '../../data/content'

function TechPill({ name }) {
  return (
    <span style={{
      fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.06em',
      padding: '3px 9px', borderRadius: 4,
      background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.16)',
      color: 'var(--blue-bright)',
    }}>
      {name}
    </span>
  )
}

function ProjectCard({ project, index, inView, featured }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16,1,0.3,1] }}
      style={{
        background: featured ? 'linear-gradient(135deg, var(--card), var(--card-hover))' : 'var(--card)',
        border: featured ? `1px solid rgba(59,130,246,0.25)` : '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'all 0.3s',
        display: 'flex',
        flexDirection: featured ? undefined : 'column',
        boxShadow: featured ? '0 0 60px rgba(59,130,246,0.05)' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = `${project.badgeColor}30`
        e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.4), 0 0 30px ${project.badgeColor}0a`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = featured ? 'rgba(59,130,246,0.25)' : 'var(--border)'
        e.currentTarget.style.boxShadow = featured ? '0 0 60px rgba(59,130,246,0.05)' : 'none'
      }}
    >
      {/* Left accent bar */}
      <div style={{
        width: featured ? undefined : 3,
        height: featured ? 3 : undefined,
        flexShrink: 0,
        background: `linear-gradient(${featured ? '90deg' : '180deg'}, ${project.badgeColor}, transparent)`,
      }} />

      <div style={{ padding: featured ? '1.75rem 2rem' : '1.5rem', flex: 1 }}>
        {/* Badge + type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: project.badgeColor,
            background: project.badgeColor + '12',
            border: `1px solid ${project.badgeColor}30`,
            borderRadius: 4, padding: '2px 8px',
          }}>
            {project.badge}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--f-display)', fontWeight: 700,
          fontSize: featured ? 'clamp(1.3rem, 2.5vw, 1.9rem)' : '1.05rem',
          color: 'var(--paper)', lineHeight: 1.15, marginBottom: '0.65rem',
          letterSpacing: '-0.015em',
        }}>
          {project.name}
        </h3>

        <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--muted)', fontWeight: 300, marginBottom: '1.1rem' }}>
          {project.description}
        </p>

        {/* Highlights */}
        <ul style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {project.highlights.map((h, i) => (
            <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: project.badgeColor, fontSize: '0.7rem', marginTop: 3, flexShrink: 0 }}>▸</span>
              <span style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.1rem' }}>
          {project.tech.map(t => <TechPill key={t} name={t} />)}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.65rem', padding: '0.5rem 1.1rem' }}>
              Live Site ↗
            </a>
          ) : featured ? (
            <span className="btn-ghost" style={{ fontSize: '0.65rem', padding: '0.5rem 1.1rem', opacity: 0.55, pointerEvents: 'none' }}>
              In Development
            </span>
          ) : null}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.65rem', padding: '0.5rem 1.1rem' }}>
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const featured = PROJECTS.filter(p => p.featured)
  const others   = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" ref={ref} style={{ padding: '7rem 0', background: 'var(--deep)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="sec-tag">03 · Projects</div>
          <h2 className="sec-heading">
            Things I've<br />
            <span style={{ color: 'var(--blue-bright)' }}>built.</span>
          </h2>
        </motion.div>

        {/* Featured */}
        {featured.map((p, i) => (
          <div key={p.id} style={{ marginBottom: '1.25rem' }}>
            <ProjectCard project={p} index={i} inView={inView} featured />
          </div>
        ))}

        {/* Others */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {others.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 1} inView={inView} featured={false} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}
        >
          <a href="https://github.com/theadarshh" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View all on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
