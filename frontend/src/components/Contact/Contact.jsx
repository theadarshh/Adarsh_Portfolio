import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { submitContact } from '../../services/api'
import { PROFILE } from '../../data/content'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try { await submitContact(form); setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }) }
    catch (err) { setStatus('error'); setErrMsg(err.response?.data?.message || 'Something went wrong.') }
  }

  const input = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 7,
    padding: '0.8rem 1rem',
    color: 'var(--paper)',
    fontFamily: 'var(--f-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color .2s',
  }
  const label = {
    fontFamily: 'var(--f-mono)',
    fontSize: '0.6rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    display: 'block',
    marginBottom: 6,
  }

  const fade = (d = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay: d, ease: [0.16,1,0.3,1] },
  })

  return (
    <section id="contact" ref={ref} style={{ padding: '7rem 0', background: 'var(--void)' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <motion.div {...fade(0)}>
              <div className="sec-tag">08 · Contact</div>
              <h2 className="sec-heading" style={{ marginBottom: '1.25rem' }}>
                Let's work<br />
                <span style={{ color: 'var(--blue-bright)' }}>together.</span>
              </h2>
            </motion.div>
            <motion.p {...fade(0.12)} style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300, marginBottom: '2rem', maxWidth: 380 }}>
              Open to full-time roles, freelance projects, and meaningful collaborations. Let's connect.
            </motion.p>

            <motion.div {...fade(0.22)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <a href={`mailto:${PROFILE.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.9rem 1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none', transition: 'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <span style={{ fontSize: '1rem' }}>✉</span>
                <div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Email</div>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.85rem', color: 'var(--blue-bright)' }}>{PROFILE.email}</div>
                </div>
              </a>

              {/* Phone numbers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', paddingLeft: 2, marginBottom: 2 }}>📞 Call Me</div>
                {[
                  { number: '+91 8861654501', tel: 'tel:+918861654501' },
                  { number: '+91 6363932341', tel: 'tel:+916363932341' },
                ].map(phone => (
                  <a
                    key={phone.tel}
                    href={phone.tel}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '0.75rem 1rem',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      textDecoration: 'none',
                      transition: 'border-color .2s, background .2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)'
                      e.currentTarget.style.background = 'rgba(34,197,94,0.04)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'var(--card)'
                    }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>📱</span>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.82rem', color: '#4ade80', letterSpacing: '0.04em' }}>{phone.number}</div>
                  </a>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.9rem 1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <span style={{ fontSize: '1rem' }}>📍</span>
                <div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Location</div>
                  <div style={{ fontFamily: 'var(--f-body)', fontSize: '0.85rem', color: 'var(--paper)' }}>{PROFILE.location}</div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fade(0.32)} style={{ padding: '0.75rem 1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                Replies within <span style={{ color: '#4ade80' }}>24 hours</span>
              </span>
              <style>{`@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            {...fade(0.18)}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={label}>Name *</label>
                <input value={form.name} onChange={set('name')} required placeholder="Your name" style={input}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={label}>Email *</label>
                <input type="email" value={form.email} onChange={set('email')} required placeholder="you@email.com" style={input}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>
            <div>
              <label style={label}>Subject</label>
              <input value={form.subject} onChange={set('subject')} placeholder="Job opportunity / Project / Collab" style={input}
                onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={label}>Message *</label>
              <textarea value={form.message} onChange={set('message')} required rows={5}
                placeholder="Tell me about the role or project..." style={{ ...input, resize: 'vertical', minHeight: 110 }}
                onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            {status === 'success' && (
              <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 7, padding: '0.7rem 1rem', fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: '#4ade80' }}>
                ✓ Message sent — I'll reply within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 7, padding: '0.7rem 1rem', fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: '#f87171' }}>
                ✕ {errMsg}
              </div>
            )}
            <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
              {status === 'sending' ? 'Sending...' : 'Send Message ↗'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
