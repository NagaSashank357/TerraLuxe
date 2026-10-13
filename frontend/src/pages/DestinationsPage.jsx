import React from 'react';
import { DestinationGrid } from '../components/DestinationGrid';
import { useDestinations } from '../hooks/useDestinations';
import { useTravel } from '../context/TravelContext';
import { Compass, Sparkles } from 'lucide-react';

export const DestinationsPage = () => {
  const { activeContinent, activeBudget, activeVibe, searchQuery } = useTravel();
  const { destinations, loading } = useDestinations({
    continent: activeContinent,
    budget: activeBudget,
    vibe: activeVibe,
    search: searchQuery,
  });

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
          <Compass size={13} /> The Worldwide Travel Index
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '0.85rem' }}>
          Explore Every Horizon
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Filter through comprehensive tourism dossiers spanning verified entry costs, prime seasonal windows, regional etiquette, and traveler reviews.
        </p>
      </div>

      {/* Grid with Interactive Filters */}
      <DestinationGrid destinations={destinations} loading={loading} />
    </div>
  );
};
