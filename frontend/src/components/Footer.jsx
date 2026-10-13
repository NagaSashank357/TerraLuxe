import React from 'react';
import { Compass, Globe, Heart, Shield, Award } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const Footer = () => {
  const { navigateTo, setActiveContinent } = useTravel();

  return (
    <footer
      className="no-print"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '4.5rem 0 2rem',
        marginTop: '5rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #F19E38 0%, #E07A5F 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass size={20} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                Terra<span style={{ color: 'var(--accent-gold)' }}>Luxe</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              The authoritative Indian experiential travel journal providing curated itineraries, royal heritage discoveries, and verified traveler dossiers across India.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                <Shield size={12} /> Verified Data
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                <Award size={12} /> Editor Choice
              </span>
            </div>
          </div>

          {/* Continent Directory */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#FFFFFF' }}>
              Destinations by Region
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {['North India', 'South India', 'West India', 'Himalayas'].map(cont => (
                <li key={cont}>
                  <button
                    onClick={() => {
                      setActiveContinent(cont);
                      navigateTo('destinations');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {cont} Tourism Dossiers
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial Sections */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#FFFFFF' }}>
              Editorial &amp; Guides
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  Itineraries &amp; Step-by-Step Routes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  Wildlife &amp; Safari Field Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  Culinary Journeys &amp; Wine Trails
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('itinerary')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  Interactive Travel Budget Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', textAlign: 'left', padding: 0, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Shield size={13} /> Admin &amp; Content Management
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture info */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#FFFFFF' }}>
              Platform Architecture
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Crafted as a decoupled fullstack platform: React (JSX + Vite) front-end connected to a clean Node.js / Express backend with MongoDB &amp; Mongoose database.
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)' }}>
              ⚡ Real-time API &amp; Offline Mock Resiliency
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} TerraLuxe Travel &amp; Tourism Group. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Curated with passion for curious travelers across</span> <Globe size={14} color="var(--accent-gold)" />
          </div>
        </div>
      </div>
    </footer>
  );
};
