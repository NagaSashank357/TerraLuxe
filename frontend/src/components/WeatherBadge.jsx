import React from 'react';
import { Sun, Thermometer, ShieldCheck } from 'lucide-react';

export const WeatherBadge = ({ bestSeason, travelVibe }) => {
  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sun size={18} color="var(--accent-gold)" /> Climate &amp; Optimal Season
        </h4>
        <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
          Verified Climate Data
        </span>
      </div>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Prime Travel Window</div>
        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{bestSeason}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <Thermometer size={16} color="#3CD0BF" />
          <span>Vibe: {travelVibe}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <ShieldCheck size={16} color="var(--accent-coral)" />
          <span>Weather Shield: Recommended</span>
        </div>
      </div>
    </div>
  );
};
