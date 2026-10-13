import React from 'react';
import { Filter, Search, RotateCcw, Compass } from 'lucide-react';
import { DestinationCard } from './DestinationCard';
import { useTravel } from '../context/TravelContext';

export const DestinationGrid = ({ destinations, loading }) => {
  const {
    activeContinent,
    setActiveContinent,
    activeBudget,
    setActiveBudget,
    activeVibe,
    setActiveVibe,
    searchQuery,
    setSearchQuery,
  } = useTravel();

  const continents = ['all', 'North India', 'South India', 'West India', 'Himalayas'];
  const budgets = ['all', 'Budget', 'Moderate', 'Luxury'];
  const vibes = ['all', 'Cultural', 'Coastal', 'Alpine', 'Relaxation'];

  const resetFilters = () => {
    setActiveContinent('all');
    setActiveBudget('all');
    setActiveVibe('all');
    setSearchQuery('');
  };

  const hasActiveFilters = activeContinent !== 'all' || activeBudget !== 'all' || activeVibe !== 'all' || searchQuery !== '';

  return (
    <section style={{ width: '100%', padding: '2rem 0' }}>
      {/* Controls & Filter Bar */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {/* Top Row: Search input + Continent Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          {/* Continent Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.25rem' }}>
              <Compass size={15} color="var(--accent-gold)" /> Region:
            </span>
            {continents.map(c => (
              <button
                key={c}
                onClick={() => setActiveContinent(c)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: activeContinent === c ? 'var(--accent-gold)' : 'var(--border-subtle)',
                  background: activeContinent === c ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeContinent === c ? '#070F1E' : 'var(--text-secondary)',
                  fontWeight: activeContinent === c ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {c === 'all' ? 'All Regions' : c}
              </button>
            ))}
          </div>

          {/* Search Box in filter bar */}
          <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 240px', maxWidth: '360px' }}>
            <input
              type="text"
              placeholder="Search by city, country or vibe..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.9rem 0.55rem 2.4rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Bottom Row: Secondary Dropdowns (Budget, Vibe) & Reset */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="budget-filter-select" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Budget Tier:</label>
              <select
                id="budget-filter-select"
                value={activeBudget}
                onChange={e => setActiveBudget(e.target.value)}
                style={{
                  background: 'rgba(7, 15, 30, 0.85)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.82rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {budgets.map(b => (
                  <option key={b} value={b}>{b === 'all' ? 'All Budgets' : b}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="vibe-filter-select" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Travel Vibe:</label>
              <select
                id="vibe-filter-select"
                value={activeVibe}
                onChange={e => setActiveVibe(e.target.value)}
                style={{
                  background: 'rgba(7, 15, 30, 0.85)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.82rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {vibes.map(v => (
                  <option key={v} value={v}>{v === 'all' ? 'All Vibes' : v}</option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-coral)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <RotateCcw size={13} /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid Content or Empty State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Gathering tourism dossiers...</div>
        </div>
      ) : destinations.length === 0 ? (
        <div
          className="glass-card"
          style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '520px', margin: '0 auto' }}
        >
          <Filter size={36} color="var(--accent-gold)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No Destinations Match</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            We could not find any travel destinations matching your current filter combinations.
          </p>
          <button onClick={resetFilters} className="btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid-cards">
          {destinations.map(destination => (
            <DestinationCard key={destination._id || destination.id} destination={destination} />
          ))}
        </div>
      )}
    </section>
  );
};
