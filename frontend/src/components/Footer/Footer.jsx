import { PROFILE } from '../../data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { label: 'GitHub',    href: PROFILE.links.github    },
    { label: 'LinkedIn',  href: PROFILE.links.linkedin  },
    { label: 'LeetCode',  href: PROFILE.links.leetcode  },
    { label: 'YouTube',   href: PROFILE.links.youtube   },
    { label: 'Portfolio v1', href: PROFILE.links.portfolio },
  ]
  const nav = [
    { label: 'About',    href: '#about'         },
    { label: 'Skills',   href: '#skills'        },
    { label: 'Projects', href: '#projects'      },
    { label: 'LeetCode', href: '#leetcode'      },
    { label: 'Education',href: '#education'     },
    { label: 'Certs',    href: '#certifications'},
    { label: 'Contact',  href: '#contact'       },
  ]

  return (
    <footer style={{ background: 'var(--void)', borderTop: '1px solid var(--border)', paddingTop: '3.5rem', paddingBottom: '2rem' }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Adarsh<span style={{ color: 'var(--blue-bright)' }}>.</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1rem', maxWidth: 220 }}>
              Full Stack Developer building scalable, production-grade web applications.
            </p>
            <a href={`mailto:${PROFILE.email}`} style={{ fontFamily: 'var(--f-mono)', fontSize: '0.68rem', color: 'var(--blue-bright)', letterSpacing: '0.04em' }}>
              {PROFILE.email}
            </a>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1rem' }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {nav.map(l => (
                <li key={l.label}>
                  <a href={l.href} style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--muted)', transition: 'color .2s', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = 'var(--blue-bright)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1rem' }}>
              Find Me On
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {socials.map(l => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--muted)', transition: 'color .2s', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = 'var(--blue-bright)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >{l.label} ↗</a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-primary" style={{ fontSize: '0.65rem', padding: '0.55rem 1.2rem' }}>Hire Me ↗</a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            © {year} Adarsh R
          </span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--faint)', textTransform: 'uppercase' }}>
            React + Spring Boot
          </span>
        </div>
      </div>
    </footer>
  )
}
