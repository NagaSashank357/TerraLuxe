import React from 'react';
import { Clock, Ticket, Sparkles, MapPin, Compass } from 'lucide-react';

export const AttractionGuide = ({ attractions, destinationName }) => {
  if (!attractions || attractions.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <Compass size={28} color="var(--accent-gold)" style={{ margin: '0 auto 0.75rem', opacity: 0.8 }} />
        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Attractions Directory Updating</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Our field writers are currently curating the verified landmarks &amp; historical sights for {destinationName}.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {attractions.map((attraction, idx) => (
        <div
          key={attraction._id || attraction.id || idx}
          className="glass-card"
          style={{
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 0,
          }}
        >
          {/* Photo */}
          <div style={{ position: 'relative', minHeight: '220px' }}>
            <img
              src={attraction.imageUrl}
              alt={attraction.name}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
              }}
            >
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                {attraction.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.65rem' }}>
              {attraction.name}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              {attraction.description}
            </p>

            {/* Practical Tourism Facts */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  <Ticket size={14} color="var(--accent-gold)" /> Admission:
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{attraction.entryFee}</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  <Clock size={14} color="#3CD0BF" /> Hours:
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{attraction.openingHours}</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  <MapPin size={14} color="var(--accent-coral)" /> Time Needed:
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{attraction.recommendedDuration}</div>
              </div>
            </div>

            {/* Insider Tip Highlight */}
            {attraction.insiderTip && (
              <div
                style={{
                  background: 'rgba(241, 158, 56, 0.08)',
                  borderLeft: '3px solid var(--accent-gold)',
                  padding: '0.75rem 1rem',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                }}
              >
                <Sparkles size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong style={{ color: 'var(--accent-gold)' }}>Local Insider Tip: </strong>
                  {attraction.insiderTip}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
