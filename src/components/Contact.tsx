import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const els = sectionRef.current?.querySelectorAll(
            '.reveal, .reveal-scale'
          );

          els?.forEach((el, i) =>
            setTimeout(() => el.classList.add('in-view'), i * 80)
          );
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          'EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to the deployment environment.'
        );
      }

      const templateParams = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        phone: '',
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        reply_to: form.email.trim(),
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey,
        }
      );

      setLoading(false);
      setSent(true);

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);

      setLoading(false);

      alert(
        'Sorry, your message could not be sent. Please try again or contact me directly by email.'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: '120px max(24px, calc((100vw - 1200px) / 2)) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '10%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Heading */}
      <div
        className="reveal"
        style={{
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#6366f1',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          05 / Contact
        </span>

        <div
          style={{
            flex: 1,
            height: 1,
            background: 'rgba(255,255,255,0.06)',
            maxWidth: 60,
          }}
        />
      </div>

      <h2
        className="reveal"
        style={{
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#f1f5f9',
          margin: '0 0 14px',
          lineHeight: 1.1,
          textAlign: 'center',
        }}
      >
        Let&apos;s Build Something{' '}
        <span className="gradient-text">Intelligent.</span>
      </h2>

      <p
        className="reveal"
        style={{
          fontSize: 16,
          color: '#64748b',
          textAlign: 'center',
          maxWidth: 500,
          margin: '0 auto 72px',
          lineHeight: 1.65,
        }}
      >
        Have a project, opportunity, or idea? Let&apos;s connect and turn it
        into something meaningful.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 32,
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left — contact info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              icon: (
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
              ),
              label: 'Email',
              value: 'abdulhadimalik4540@gmail.com',
              href: 'mailto:abdulhadimalik4540@gmail.com',
              color: '#6366f1',
            },
            {
              icon: (
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              ),
              label: 'GitHub',
              value: 'github.com/abdulhadi-mlk',
              href: 'https://github.com/abdulhadi-mlk',
              color: '#3b82f6',
            },
            {
              icon: (
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 .792 0 1.771 0h20.451z"
                  />
                </svg>
              ),
              label: 'LinkedIn',
              value: 'Abdul Hadi',
              href: 'https://www.linkedin.com/in/abdul-hadi-mlk/',
              color: '#06b6d4',
            },
          ].map((item) => (
            <ContactItem key={item.label} {...item} />
          ))}

          {/* Availability card */}
          <div
            className="reveal"
            style={{
              marginTop: 8,
              padding: '20px',
              borderRadius: 14,
              background: 'rgba(34,197,94,0.05)',
              border: '1px solid rgba(34,197,94,0.15)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  display: 'inline-block',
                  animation: 'pulse-node 2s ease-in-out infinite',
                }}
              />

              <span
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#4ade80',
                }}
              >
                Available for Opportunities
              </span>
            </div>

            <p
              style={{
                fontSize: 12,
                color: '#64748b',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Open to internships, junior roles, AI/ML projects, and freelance
              opportunities.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div
          className="reveal"
          style={{
            borderRadius: 20,
            background: '#0c1018',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '36px 32px',
          }}
        >
          {sent ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                padding: '60px 0',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 52 }}>✅</div>

              <h3
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 800,
                  fontSize: 22,
                  color: '#f1f5f9',
                  margin: 0,
                }}
              >
                Message Sent!
              </h3>

              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
                Thanks for reaching out. I&apos;ll get back to you shortly.
              </p>

              <button
                onClick={() => {
                  setSent(false);
                  setForm({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                  });
                }}
                style={{
                  marginTop: 8,
                  padding: '10px 24px',
                  borderRadius: 8,
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  color: '#a5b4fc',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 14,
                }}
              >
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      name: v,
                    }))
                  }
                  placeholder="Abdul Hadi"
                  required
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      email: v,
                    }))
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Field
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    subject: v,
                  }))
                }
                placeholder="Project opportunity / Internship / Collaboration"
                required
              />

              <Field
                label="Message"
                name="message"
                textarea
                value={form.message}
                onChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    message: v,
                  }))
                }
                placeholder="Tell me about your project or opportunity..."
                required
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '14px 28px',
                  borderRadius: 10,
                  background:
                    'linear-gradient(135deg, #6366f1 0%, #3b82f6 60%, #06b6d4 100%)',
                  border: 'none',
                  color: '#fff',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'opacity 0.2s, transform 0.2s',
                  opacity: loading ? 0.75 : 1,
                  boxShadow: '0 4px 24px rgba(99,102,241,0.3)',
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin-slow 0.7s linear infinite',
                      }}
                    />

                    Sending...
                  </>
                ) : (
                  <>
                    Send Message

                    <svg
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 18px',
        borderRadius: 12,
        background: hovered ? '#101520' : '#0c1018',
        border: `1px solid ${
          hovered ? color + '35' : 'rgba(255,255,255,0.07)'
        }`,
        textDecoration: 'none',
        transition: 'all 0.2s',
        transform: hovered ? 'translateX(4px)' : 'none',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: color + '15',
          border: `1px solid ${color}28`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            color: '#475569',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.06em',
            marginBottom: 2,
          }}
        >
          {label.toUpperCase()}
        </div>

        <div
          style={{
            fontSize: 13,
            color: '#e2e8f0',
            fontWeight: 500,
          }}
        >
          {value}
        </div>
      </div>
    </a>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  textarea,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 9,
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${
      focused
        ? 'rgba(99,102,241,0.5)'
        : 'rgba(255,255,255,0.08)'
    }`,
    color: '#f1f5f9',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused
      ? '0 0 0 3px rgba(99,102,241,0.12)'
      : 'none',
    resize: 'none',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
      }}
    >
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#64748b',
          fontFamily: 'Manrope, sans-serif',
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </div>
  );
}
