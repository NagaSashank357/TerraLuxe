import React from 'react';
import { Search, Compass, MapPin, Sparkles, ShieldCheck, Star } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const HeroBanner = () => {
  const { navigateTo, searchQuery, setSearchQuery } = useTravel();

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo('destinations');
  };

  const quickPicks = ['Kerala Backwaters', 'Jaipur & Udaipur', 'Ladakh & Pangong', 'Goa Shores', 'Varanasi Ghats'];

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 0',
        overflow: 'hidden',
        background: `linear-gradient(180deg, rgba(7, 15, 30, 0.45) 0%, rgba(7, 15, 30, 0.95) 100%),
                     url('https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=2000&q=85') center/cover no-repeat`,
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Editorial Top Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
          <span className="badge badge-gold" style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
            <Sparkles size={14} /> The Connoisseur&apos;s Indian Travel &amp; Tourism Journal
          </span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
            fontWeight: 800,
            maxWidth: '920px',
            margin: '0 auto 1.25rem',
            lineHeight: 1.15,
          }}
        >
          Discover Incredible India, Guided by{' '}
          <span className="text-gold-gradient">Authentic Mastery</span>
        </h1>

        {/* Hero Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Curated Indian itineraries, royal heritage dossiers, verified monument fees in INR (₹), prime seasons, and authentic traveler advice.
        </p>

        {/* Integrated Hero Search Form */}
        <form
          onSubmit={handleSearch}
          className="glass-card"
          style={{
            maxWidth: '720px',
            margin: '0 auto 1.8rem',
            padding: '0.6rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: 'var(--shadow-lg), 0 0 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
            <MapPin size={20} color="var(--accent-gold)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Where in India is your next journey? (e.g., Kerala, Jaipur, Ladakh...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.02rem',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0.85rem 1.8rem', borderRadius: 'var(--radius-full)' }}
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '0.25rem' }}>Trending:</span>
          {quickPicks.map(city => (
            <button
              key={city}
              onClick={() => {
                setSearchQuery(city);
                navigateTo('destinations');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Trust & Tourism Stats Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ background: 'var(--accent-gold-subtle)', padding: '0.75rem', borderRadius: '12px' }}>
              <Compass size={24} color="var(--accent-gold)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>85+ Nations</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Exhaustive tourism dossiers</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(42, 157, 143, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
              <ShieldCheck size={24} color="#3CD0BF" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>Verified Insights</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Entry fees &amp; transit hacks</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(224, 122, 95, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
              <Star size={24} color="var(--accent-coral)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>4.9/5 Rating</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>From experienced travelers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
