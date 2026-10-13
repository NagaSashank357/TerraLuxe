import React from 'react';
import { Star, MapPin, Calendar, DollarSign, Bookmark, ArrowUpRight, Compass } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const DestinationCard = ({ destination }) => {
  const { navigateTo, isSaved, toggleSaveDestination } = useTravel();
  const destId = destination._id || destination.id;
  const saved = isSaved(destId);

  return (
    <article
      className="glass-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => navigateTo('destination-detail', destId)}
    >
      {/* Image Banner with Badges */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img
          src={destination.thumbnailUrl || destination.heroImageUrl}
          alt={`${destination.name}, ${destination.country}`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
        />

        {/* Gradient Shadow Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7, 15, 30, 0.2) 0%, rgba(7, 15, 30, 0.75) 100%)',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            right: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span className="badge badge-glass">
            <Compass size={12} color="var(--accent-gold)" />
            {destination.continent}
          </span>

          <button
            onClick={e => {
              e.stopPropagation();
              toggleSaveDestination(destId);
            }}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: saved ? 'var(--accent-gold)' : 'rgba(7, 15, 30, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: saved ? '#070F1E' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Bookmark size={16} fill={saved ? '#070F1E' : 'none'} />
          </button>
        </div>

        {/* Travel Vibe Bottom-Left Badge */}
        <div style={{ position: 'absolute', bottom: '0.85rem', left: '1rem' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
            {destination.travelVibe}
          </span>
        </div>

        {/* Rating Bottom-Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.85rem',
            right: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'rgba(7, 15, 30, 0.75)',
            backdropFilter: 'blur(8px)',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <Star size={13} fill="#F19E38" color="#F19E38" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>{destination.rating}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({destination.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{destination.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <MapPin size={14} color="var(--accent-gold)" />
            <span>{destination.country}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {destination.tagline}
        </p>

        {/* Key Tourism Metadata Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.65rem',
            padding: '0.85rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem',
            fontSize: '0.8rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
              <Calendar size={13} color="var(--accent-gold)" />
              <span>Best Season</span>
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {destination.bestSeason ? destination.bestSeason.split('(')[0].trim() : 'Spring/Fall'}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3CD0BF', lineHeight: 1 }}>₹</span>
              <span>Est. Daily Cost</span>
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              ₹{Number(destination.averageDailyCost || 0).toLocaleString('en-IN')} <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/ day</span>
            </div>
          </div>
        </div>

        {/* Action Link Footer */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Full Tourism Dossier <ArrowUpRight size={15} />
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {destination.attractions?.length || '3+'} Key Sights
          </span>
        </div>
      </div>
    </article>
  );
};
