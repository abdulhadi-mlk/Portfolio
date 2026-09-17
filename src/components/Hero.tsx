import { useEffect, useRef, useState } from 'react';

const roles = [
  'AI/ML Engineer',
  'Data Scientist',
  'Full-Stack Developer',
  'MERN Stack Dev',
];

function useTypingEffect(words: string[], speed = 70, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function NeuralNet() {
  const nodes = [
    { x: 60, y: 80, size: 6, delay: 0 },
    { x: 60, y: 160, size: 5, delay: 0.4 },
    { x: 60, y: 240, size: 6, delay: 0.8 },
    { x: 60, y: 320, size: 4, delay: 1.2 },
    { x: 190, y: 60, size: 7, delay: 0.2 },
    { x: 190, y: 140, size: 6, delay: 0.6 },
    { x: 190, y: 220, size: 7, delay: 1.0 },
    { x: 190, y: 300, size: 5, delay: 1.4 },
    { x: 190, y: 370, size: 4, delay: 0.3 },
    { x: 320, y: 100, size: 8, delay: 0.5 },
    { x: 320, y: 200, size: 7, delay: 0.9 },
    { x: 320, y: 300, size: 8, delay: 1.3 },
    { x: 440, y: 150, size: 9, delay: 0.7 },
    { x: 440, y: 260, size: 8, delay: 1.1 },
  ];

  const edges = [
    [0, 4], [0, 5], [1, 4], [1, 5], [1, 6], [2, 5], [2, 6], [2, 7],
    [3, 6], [3, 7], [3, 8], [4, 9], [4, 10], [5, 9], [5, 10], [5, 11],
    [6, 10], [6, 11], [7, 10], [7, 11], [8, 11], [9, 12], [9, 13],
    [10, 12], [10, 13], [11, 12], [11, 13],
  ];

  return (
    <svg
      viewBox="0 0 500 430"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="node0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
        <radialGradient id="node1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </radialGradient>
        <radialGradient id="node2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        return (
          <line
            key={i}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="url(#edgeGrad)"
            strokeWidth="1"
            strokeDasharray={`${len} ${len}`}
            strokeDashoffset={len}
            opacity="0.45"
            style={{
              animation: `flow ${1.8 + (i % 4) * 0.3}s ease-in-out ${(i * 0.12) % 1.5}s infinite alternate`,
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const gradId = i < 4 ? 'node0' : i < 9 ? 'node1' : i < 12 ? 'node2' : 'node0';
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.size}
            fill={`url(#${gradId})`}
            filter="url(#glow)"
            style={{
              animation: `pulse-node ${2.2 + (i % 3) * 0.4}s ease-in-out ${n.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Layer labels */}
      {[
        { x: 60, label: 'Input' },
        { x: 190, label: 'Hidden' },
        { x: 320, label: 'Deep' },
        { x: 440, label: 'Output' },
      ].map(({ x, label }) => (
        <text
          key={label}
          x={x}
          y={415}
          textAnchor="middle"
          fill="#475569"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.05em"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function Hero() {
  const role = useTypingEffect(roles);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px max(24px, calc((100vw - 1200px) / 2)) 80px',
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Status badge */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 100,
                border: '1px solid rgba(34,197,94,0.3)',
                background: 'rgba(34,197,94,0.06)',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  animation: 'pulse-node 2s ease-in-out infinite',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#4ade80',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.04em',
                }}
              >
                Available for Opportunities
              </span>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#f1f5f9',
                margin: 0,
              }}
            >
              Building{' '}
              <span className="gradient-text">Intelligent</span>
              <br />
              Solutions with
              <br />
              AI &amp; Code.
            </h1>
          </div>

          {/* Role typer */}
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 15,
              color: '#64748b',
              letterSpacing: '0.02em',
              minHeight: 24,
            }}
          >
            <span style={{ color: '#6366f1' }}>&gt; </span>
            <span style={{ color: '#94a3b8' }}>{role}</span>
            <span
              className="cursor-blink"
              style={{
                color: '#6366f1',
                fontWeight: 400,
                marginLeft: 1,
              }}
            >
              _
            </span>
          </div>

          {/* Subtext */}
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: '#64748b',
              margin: 0,
              maxWidth: 480,
            }}
          >
            Computer Science student and AI/ML &amp; Full-Stack Developer passionate about building
            intelligent, scalable, and user-focused applications.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '13px 28px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 60%, #06b6d4 100%)',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'Manrope, sans-serif',
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s, opacity 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 24px rgba(99,102,241,0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(99,102,241,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(99,102,241,0.3)';
              }}
            >
              View My Projects
            </button>
            <a
              href="/Abdul-Hadi-Resume.pdf"
              download="Abdul-Hadi-Resume.pdf"
              aria-label="Download resume"
              style={{
                padding: '13px 28px',
                borderRadius: 10,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f1f5f9',
                fontWeight: 700,
                fontFamily: 'Manrope, sans-serif',
                fontSize: 14,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.08)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </a>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
              Find me on
            </span>
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)' }} />
            <SocialLink href="https://github.com" label="GitHub">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </SocialLink>
            <SocialLink href="https://linkedin.com" label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialLink>
            <SocialLink href="mailto:abdulhadi@example.com" label="Email">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </SocialLink>
          </div>
        </div>

        {/* Right - Neural net visual */}
        <div
          style={{
            position: 'relative',
            height: 460,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hero-visual"
        >
          {/* Card container */}
          <div
            className="glass gradient-border"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 24,
              padding: '32px 24px 48px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Header bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
              }}
            >
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <div
                  key={c}
                  style={{ width: 10, height: 10, borderRadius: '50%', background: c }}
                />
              ))}
              <span
                style={{
                  marginLeft: 8,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  color: '#475569',
                }}
              >
                neural_network.py
              </span>
            </div>

            <NeuralNet />

            {/* Floating label */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                padding: '4px 10px',
                borderRadius: 6,
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#a5b4fc',
                letterSpacing: '0.05em',
              }}
            >
              LIVE
            </div>
          </div>

          {/* Floating stat cards */}
          <div
            style={{
              position: 'absolute',
              bottom: -16,
              left: -20,
              background: '#0c1018',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '12px 18px',
              backdropFilter: 'blur(20px)',
              animation: 'float 4s ease-in-out infinite',
            }}
          >
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#06b6d4',
                letterSpacing: '0.06em',
                marginBottom: 2,
              }}
            >
              ACCURACY
            </div>
            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 800,
                fontSize: 22,
                color: '#f1f5f9',
              }}
            >
              97.4%
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: -16,
              background: '#0c1018',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '12px 18px',
              backdropFilter: 'blur(20px)',
              animation: 'float 5s ease-in-out 1s infinite',
            }}
          >
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: '#a5b4fc',
                letterSpacing: '0.06em',
                marginBottom: 2,
              }}
            >
              MODELS
            </div>
            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 800,
                fontSize: 22,
                color: '#f1f5f9',
              }}
            >
              10+
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'float 2.5s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            color: '#334155',
            letterSpacing: '0.1em',
          }}
        >
          SCROLL
        </span>
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-visual {
            height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      style={{
        width: 38,
        height: 38,
        borderRadius: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#64748b',
        transition: 'color 0.2s, background 0.2s, border-color 0.2s, transform 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#f1f5f9';
        (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.12)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.4)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#64748b';
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {children}
    </a>
  );
}
