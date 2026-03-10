import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '../../data/content'

const CATEGORIES = ['Programming', 'Backend', 'Frontend', 'Database', 'Cloud / DevOps', 'Core Concepts']

function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.035, ease: [0.16,1,0.3,1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '1.1rem 0.7rem',
        borderRadius: 10,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        cursor: 'default',
        transition: 'all 0.25s cubic-bezier(.16,1,.3,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = skill.color + '44'
        el.style.background  = skill.color + '0c'
        el.style.transform   = 'translateY(-5px) scale(1.03)'
        el.style.boxShadow   = `0 12px 28px rgba(0,0,0,0.3), 0 0 20px ${skill.color}16`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border)'
        el.style.background  = 'var(--card)'
        el.style.transform   = 'translateY(0) scale(1)'
        el.style.boxShadow   = 'none'
      }}
    >
      {/* Icon */}
      <div style={{ height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {skill.devicon ? (
          <i
            className={`devicon-${skill.devicon}-plain colored`}
            style={{ fontSize: '1.75rem', filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.4))' }}
          />
        ) : (
          <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{skill.emoji}</span>
        )}
      </div>
      {/* Name */}
      <span style={{
        fontFamily: 'var(--f-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.06em',
        textAlign: 'center',
        color: 'var(--muted)',
        lineHeight: 1.4,
      }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  let globalIdx = 0

  return (
    <section id="skills" ref={ref} style={{ padding: '7rem 0', background: 'var(--void)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="sec-tag">02 · Tech Stack</div>
          <h2 className="sec-heading">
            Tools of the<br />
            <span style={{ color: 'var(--blue-bright)' }}>trade.</span>
          </h2>
        </motion.div>

        {CATEGORIES.map((cat, ci) => {
          const catSkills = SKILLS.filter(s => s.category === cat)
          return (
            <div key={cat} style={{ marginBottom: '2.5rem' }}>
              {/* Category header */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.06 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}
              >
                <span style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--blue-bright)',
                  flexShrink: 0,
                }}>
                  {cat}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.55rem', color: 'var(--faint)' }}>{catSkills.length}</span>
              </motion.div>

              {/* Skill grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
                gap: '0.625rem',
              }}>
                {catSkills.map(skill => {
                  const idx = globalIdx++
                  return <SkillCard key={skill.name} skill={skill} index={idx} inView={inView} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
