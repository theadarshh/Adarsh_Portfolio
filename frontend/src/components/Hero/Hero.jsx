import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '../../data/content'

/* ── Particle canvas ───────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const N = 48
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.14,
      r: Math.random() * 1.2 + 0.4, a: Math.random() * 0.25 + 0.06,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${p.a})`; ctx.fill()
      })
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(59,130,246,${0.05 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

/* ── Grid overlay ──────────────────────────────────── */
function GridOverlay() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.025 }}>
      <defs>
        <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#3b82f6" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  )
}

/* ── Tech badge ────────────────────────────────────── */
function TechBadge({ name, devicon, color, delay, top, bottom, left, right }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top, bottom, left, right,
        background: 'rgba(10,16,30,0.88)',
        border: `1px solid ${color}40`,
        borderRadius: 10,
        padding: '7px 13px',
        display: 'flex', alignItems: 'center', gap: 8,
        backdropFilter: 'blur(12px)',
        boxShadow: `0 8px 28px rgba(0,0,0,0.5), 0 0 20px ${color}15`,
        zIndex: 10,
        whiteSpace: 'nowrap',
      }}
    >
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        {devicon && <i className={`${devicon} colored`} style={{ fontSize: '1.05rem', flexShrink: 0 }} />}
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', letterSpacing: '0.05em', color: 'rgba(200,215,235,0.85)' }}>{name}</span>
      </motion.span>
    </motion.div>
  )
}

/* ── Profile portrait — premium framed design ─────── */
function ProfilePortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', width: '100%', height: '100%' }}
    >
      {/* ── Deep ground glow ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '110%', height: 260,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.38) 0%, transparent 62%)',
        filter: 'blur(36px)', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Oscillating rings ── */}
      <motion.div
        animate={{ rotate: [0, 45, 0, -45, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
          width: 300, height: 300, borderRadius: '50%',
          border: '1px dashed rgba(59,130,246,0.25)', zIndex: 0, pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ rotate: [0, -45, 0, 45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          border: '1px dashed rgba(59,130,246,0.1)', zIndex: 0, pointerEvents: 'none',
        }}
      />

      {/* ── FRAME WRAPPER ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 460,
        height: '100%', maxHeight: '84vh',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}>

        {/* Animated gradient border frame */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 20,
          padding: 2,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.7) 0%, rgba(34,211,238,0.3) 40%, rgba(59,130,246,0.05) 60%, rgba(168,85,247,0.4) 100%)',
          zIndex: 1,
        }}>
          <div style={{
            width: '100%', height: '100%',
            borderRadius: 18,
            background: 'linear-gradient(160deg, rgba(8,14,26,0.95) 0%, rgba(12,20,38,0.88) 100%)',
          }} />
        </div>

        {/* ── Corner bracket decorations ── */}
        {/* Top-left */}
        <svg style={{ position:'absolute', top: 8, left: 8, zIndex: 4 }} width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M2 18 L2 2 L18 2" stroke="rgba(59,130,246,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        {/* Top-right */}
        <svg style={{ position:'absolute', top: 8, right: 8, zIndex: 4 }} width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M26 18 L26 2 L10 2" stroke="rgba(34,211,238,0.8)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        {/* Bottom-left */}
        <svg style={{ position:'absolute', bottom: 8, left: 8, zIndex: 4 }} width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M2 10 L2 26 L18 26" stroke="rgba(59,130,246,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        {/* Bottom-right */}
        <svg style={{ position:'absolute', bottom: 8, right: 8, zIndex: 4 }} width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M26 10 L26 26 L10 26" stroke="rgba(168,85,247,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>

        {/* ── Top HUD bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          style={{
            position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 10, zIndex: 5,
            background: 'rgba(8,14,26,0.82)', borderRadius: 8,
            border: '1px solid rgba(59,130,246,0.2)',
            padding: '4px 12px', backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 6px rgba(96,165,250,0.8)' }} />
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.52rem', letterSpacing: '0.14em', color: 'rgba(148,163,184,0.7)', textTransform: 'uppercase' }}>ADARSH.R — SWE</span>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 6px rgba(96,165,250,0.8)' }} />
        </motion.div>

        {/* ── Scan line animation ── */}
        <motion.div
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', left: 2, right: 2, height: 2, zIndex: 3,
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(34,211,238,0.8), rgba(59,130,246,0.5), transparent)',
            filter: 'blur(1px)',
            borderRadius: 1,
            pointerEvents: 'none',
          }}
        />

        {/* ── Side coordinate labels ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          style={{
            position: 'absolute', left: 14, top: '38%',
            fontFamily: 'var(--f-mono)', fontSize: '0.42rem',
            letterSpacing: '0.12em', color: 'rgba(59,130,246,0.45)',
            textTransform: 'uppercase', writingMode: 'vertical-rl',
            textOrientation: 'mixed', zIndex: 5, userSelect: 'none',
          }}
        >
          12.9716°N · 77.5946°E
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          style={{
            position: 'absolute', right: 14, top: '30%',
            fontFamily: 'var(--f-mono)', fontSize: '0.42rem',
            letterSpacing: '0.12em', color: 'rgba(34,211,238,0.4)',
            textTransform: 'uppercase', writingMode: 'vertical-rl',
            textOrientation: 'mixed', zIndex: 5, userSelect: 'none',
          }}
        >
          BANGALORE · IN
        </motion.div>

        {/* ── The photo ── */}
        <img
          src="/adarsh.png"
          alt="Adarsh R"
          style={{
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'bottom center',
    transform: 'scale(1.05)',   // small zoom only
    display: 'block',
    filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.7))',
    userSelect: 'none',
    pointerEvents: 'none'
  }}
          draggable={false}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
        {/* Fallback */}
        <div style={{
          display: 'none', position: 'relative', zIndex: 2,
          width: '92%', height: '96%',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: '7rem', color: 'transparent', WebkitTextStroke: '2px rgba(96,165,250,0.3)' }}>AR</span>
        </div>

        {/* ── Bottom info strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          style={{
            position: 'absolute', bottom: 16, left: 16, right: 16,
            background: 'rgba(8,14,26,0.88)',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: 10, padding: '8px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backdropFilter: 'blur(12px)', zIndex: 5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.9)', animation: 'pdot 2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4ade80' }}>Open to Roles</span>
          </div>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(148,163,184,0.45)', textTransform: 'uppercase' }}>B.E · ISE · 2024</span>
        </motion.div>

      </div>{/* end frame wrapper */}

      <style>{`@keyframes pdot{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </motion.div>
  )
}

const rise = d => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } })

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '80px 0 0', overflow: 'hidden',
      background: 'var(--void)',
    }}>
      <ParticleField />
      <GridOverlay />
      <div className="orb" style={{ width: 700, height: 700, background: 'rgba(59,130,246,0.06)', top: '-15%', left: '20%' }} />
      <div className="orb" style={{ width: 280, height: 280, background: 'rgba(34,211,238,0.05)', bottom: '5%', right: '8%' }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>

          {/* ── LEFT TEXT COLUMN ── */}
          <div style={{ flex: '1 1 0', maxWidth: 600, paddingBottom: '4rem', minWidth: 0 }}>

            {/* Status pill */}
            <motion.div {...rise(0.1)} style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--f-mono)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--blue-bright)', background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.22)', borderRadius: 20, padding: '6px 14px',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 7px rgba(34,197,94,0.8)' }} />
                Bangalore · {PROFILE.status}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...rise(0.2)}>
              <h1 style={{
                fontFamily: 'var(--f-display)', fontWeight: 800,
                fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
                lineHeight: 1.0, letterSpacing: '-0.03em',
                color: 'var(--paper)', margin: 0,
              }}>
                {PROFILE.name}<span style={{ color: 'var(--blue-bright)' }}>.</span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div {...rise(0.32)} style={{ margin: '0.9rem 0 0.85rem' }}>
              <span style={{
                fontFamily: 'var(--f-mono)', fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--blue-bright)',
              }}>
                // {PROFILE.role}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p {...rise(0.42)} style={{
              fontFamily: 'var(--f-body)', fontSize: 'clamp(0.92rem, 1.4vw, 1.08rem)',
              fontWeight: 300, lineHeight: 1.8, color: 'var(--muted)',
              maxWidth: 480, marginBottom: '2rem', marginTop: 0,
            }}>
              {PROFILE.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div {...rise(0.52)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn-primary" style={{ fontSize: '0.78rem' }}>View My Work ↗</a>
              <a href="https://drive.google.com/uc?export=download&id=1XVC2CFs0I1yplomyr7rC_2MNokMwwChr" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.78rem' }}>
                Download CV ↓
              </a>
              <a href="https://drive.google.com/file/d/1XVC2CFs0I1yplomyr7rC_2MNokMwwChr/preview" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.78rem' }}>
                Preview Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div {...rise(0.64)} style={{
              display: 'flex', flexWrap: 'wrap', gap: '1.75rem',
              paddingTop: '1.4rem', borderTop: '1px solid var(--border)',
            }}>
              {[
                { label: 'LeetCode Problems', value: '250+' },
                { label: 'Technologies',       value: '18+'  },
                { label: 'OCI Certifications', value: '3'    },
                { label: 'Years Coding',        value: '3+'  },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 'clamp(1.25rem, 2vw, 1.7rem)', color: 'var(--blue-bright)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT PORTRAIT COLUMN ── */}
          <div
            className="hidden lg:block"
            style={{
              position: 'relative',
              flexShrink: 0,
              width: 'clamp(360px, 38vw, 520px)',
              height: '92vh',
              maxHeight: 820,
            }}
          >
            <ProfilePortrait />

           {/* LEFT badges */}
<TechBadge
  name="Spring Boot"
  devicon="devicon-spring-plain"
  color="#6db33f"
  delay={1.0}
  top="18%"
  left="-70px"
/>

<TechBadge
  name="Java"
  devicon="devicon-java-plain"
  color="#f89820"
  delay={1.25}
  top="50%"
  left="-60px"
/>

{/* RIGHT badges */}
<TechBadge
  name="React"
  devicon="devicon-react-plain"
  color="#61dafb"
  delay={1.1}
  top="30%"
  right="-70px"
/>

<TechBadge
  name="MySQL"
  devicon="devicon-mysql-plain"
  color="#4479a1"
  delay={1.4}
  top="62%"
  right="-60px"
/>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
      >
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--faint)' }}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(180deg, var(--faint), transparent)' }} />
      </motion.div>
    </section>
  )
}
