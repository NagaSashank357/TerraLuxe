import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const NewsletterCTA = () => {
  const { showToast } = useTravel();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the TerraLuxe Private Travel Circle!');
  };

  return (
    <section style={{ padding: '4rem 0' }}>
      <div
        className="glass-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16, 33, 56, 0.9) 0%, rgba(11, 25, 44, 0.95) 100%)',
          border: '1px solid rgba(241, 158, 56, 0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '180px',
            background: 'radial-gradient(ellipse at top, rgba(241, 158, 56, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
            <Sparkles size={13} /> The Discerning Explorer Dispatch
          </span>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.85rem' }}>
            Curated Global Secrets Delivered to Your Inbox
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
            Receive quarterly cultural itineraries, private safari guides, and unpublicized boutique recommendations directly from our contributing editors.
          </p>

          {subscribed ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(42, 157, 143, 0.2)',
                border: '1px solid #2A9D8F',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-full)',
                color: '#3CD0BF',
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={18} />
              <span>You are subscribed. Your welcome edition is en route!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                maxWidth: '500px',
                margin: '0 auto',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem',
              }}
            >
              <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
                <Mail size={18} color="var(--accent-gold)" style={{ marginRight: '0.65rem', flexShrink: 0 }} />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.75rem 1.6rem', borderRadius: 'var(--radius-full)' }}
              >
                <span>Subscribe</span>
                <Send size={15} />
              </button>
            </form>
          )}

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem' }}>
            Zero spam. Unsubscribe in one click whenever you desire.
          </div>
        </div>
      </div>
    </section>
  );
};
