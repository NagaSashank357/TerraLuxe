import React, { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { travelApi } from '../services/api';
import { AttractionGuide } from '../components/AttractionGuide';
import { WeatherBadge } from '../components/WeatherBadge';
import { ReviewSection } from '../components/ReviewSection';
import {
  MapPin,
  Calendar,
  DollarSign,
  Globe,
  Coins,
  Bookmark,
  ArrowLeft,
  Star,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const DestinationDetailPage = () => {
  const { selectedDestinationId, navigateTo, isSaved, toggleSaveDestination } = useTravel();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedDestinationId) return;

    setLoading(true);
    travelApi.getDestinationById(selectedDestinationId)
      .then(data => {
        setDestination(data);
      })
      .catch(() => {
        setDestination(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedDestinationId]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>Loading destination dossier...</h3>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Destination Not Found</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The requested travel dossier could not be located.</p>
        <button onClick={() => navigateTo('destinations')} className="btn-primary">
          <ArrowLeft size={16} /> Return to Destinations
        </button>
      </div>
    );
  }

  const destId = destination._id || destination.id;
  const saved = isSaved(destId);

  return (
    <div>
      {/* Immersive Destination Header Banner */}
      <div
        style={{
          position: 'relative',
          height: '65vh',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '3.5rem',
          background: `linear-gradient(180deg, rgba(7, 15, 30, 0.3) 0%, rgba(7, 15, 30, 0.95) 100%),
                       url('${destination.heroImageUrl}') center/cover no-repeat`,
        }}
      >
        <div className="container">
          {/* Back button */}
          <button
            onClick={() => navigateTo('destinations')}
            style={{
              background: 'rgba(7, 15, 30, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={16} /> Back to All Destinations
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-gold">{destination.continent}</span>
                <span className="badge badge-emerald">{destination.travelVibe}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>
                  <Star size={15} fill="#F19E38" color="#F19E38" />
                  <span>{destination.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({destination.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
                {destination.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '1.15rem' }}>
                <MapPin size={20} color="var(--accent-gold)" />
                <span>{destination.country}</span>
                <span>•</span>
                <span style={{ color: 'var(--text-muted)' }}>{destination.tagline}</span>
              </div>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleSaveDestination(destId)}
              className={saved ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}
            >
              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
              <span>{saved ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
        {/* Quick Tourism Metadata Dossier Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem',
          }}
        >
          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
              <Calendar size={16} color="var(--accent-gold)" /> Prime Season
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>{destination.bestSeason}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#3CD0BF', lineHeight: 1 }}>₹</span> Est. Daily Budget
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              ₹{Number(destination.averageDailyCost || 0).toLocaleString('en-IN')} <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ day</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
              <Coins size={16} color="var(--accent-coral)" /> Currency
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>{destination.currency}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
              <Globe size={16} color="#70A5FF" /> Primary Language
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>{destination.language}</div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* Left Column: Narrative overview + Attractions */}
          <div style={{ gridColumn: 'span 2' }}>
            <section style={{ marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Cultural Landscape &amp; Character
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {destination.description}
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#3CD0BF" />
                  <span style={{ fontSize: '0.88rem' }}>Tier: {destination.budgetLevel} Expense</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <ShieldCheck size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: '0.88rem' }}>Verified Tourist Safety</span>
                </div>
              </div>
            </section>

            {/* Attractions and Landmarks */}
            <section style={{ marginBottom: '3.5rem' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                  <Sparkles size={13} /> Sights Directory
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                  Key Landmarks, Heritage Sites &amp; Secrets
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Verified admission charges, peak hours, and local etiquette tips.
                </p>
              </div>

              <AttractionGuide
                attractions={destination.attractions}
                destinationName={destination.name}
              />
            </section>

            {/* Traveler Reviews & Form */}
            <section>
              <ReviewSection
                destinationId={destId}
                initialReviews={destination.reviews || []}
                rating={destination.rating}
                reviewsCount={destination.reviewsCount}
              />
            </section>
          </div>

          {/* Right Column: Climate & Quick Planner */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <WeatherBadge
              bestSeason={destination.bestSeason}
              travelVibe={destination.travelVibe}
            />

            {/* Trip Planner Callout */}
            <div
              className="glass-card"
              style={{
                padding: '1.75rem',
                background: 'linear-gradient(135deg, rgba(241, 158, 56, 0.1) 0%, rgba(16, 33, 56, 0.9) 100%)',
                border: '1px solid rgba(241, 158, 56, 0.3)',
              }}
            >
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>
                Plan Your {destination.name} Trip
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Customize your day-by-day sightseeing pace and calculate lodging + meal estimates.
              </p>
              <button
                onClick={() => navigateTo('itinerary')}
                className="btn-primary"
                style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.88rem' }}
              >
                Launch Trip Planner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
