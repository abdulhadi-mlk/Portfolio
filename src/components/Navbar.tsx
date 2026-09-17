import { useState, useEffect } from 'react';

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

const GitHubIcon = () => (
  <a
    href="https://github.com/abdulhadi-mlk"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  </a>
);
const LinkedInIcon = () => (
    <a
    href="https://www.linkedin.com/in/abdul-hadi-mlk/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
   >
  <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
   </a>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 max(24px, calc((100vw - 1200px) / 2))',
          background: scrolled ? 'rgba(7,9,15,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(22px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 800,
              fontSize: 13,
              color: '#fff',
              letterSpacing: '-0.02em',
              flexShrink: 0,
            }}
          >
            AH
          </div>
          <span
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              color: '#f1f5f9',
              letterSpacing: '-0.01em',
            }}
          >
            Abdul Hadi
          </span>
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: 36,
            alignItems: 'center',
          }}
          className="desktop-links"
        >
          {links.map((l) => (
            <NavLink key={l} label={l} onClick={() => scrollTo(l)} />
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="desktop-social"
            style={{ color: '#64748b', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="desktop-social"
            style={{ color: '#64748b', display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            <LinkedInIcon />
          </a>
          <a
            href="/Abdul-Hadi-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 60%, #06b6d4 100%)',
              backgroundSize: '200% 200%',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.88';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            CV
          </a>
          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#f1f5f9',
              display: 'flex',
              padding: 4,
            }}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 199,
            background: 'rgba(7,9,15,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '28px 24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8',
                fontSize: 17,
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                textAlign: 'left',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              {l}
            </button>
          ))}
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#64748b' }}>
              <GitHubIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#64748b' }}>
              <LinkedInIcon />
            </a>
          </div>
        </div>
      )}
      <style>{`
        .desktop-links,
        .desktop-social {
          display: flex;
        }
        .mobile-toggle {
          display: none !important;
        }
        @media (max-width: 768px) {
          .desktop-links,
          .desktop-social {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#64748b',
        fontSize: 13.5,
        fontWeight: 500,
        letterSpacing: '0.01em',
        transition: 'color 0.2s',
        padding: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
    >
      {label}
    </button>
  );
}
