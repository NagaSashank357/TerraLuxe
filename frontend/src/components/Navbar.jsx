import React, { useState } from 'react';
import { Compass, Bookmark, Search, Menu, X, Sparkles, MapPin, Shield } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const Navbar = () => {
  const { activePage, navigateTo, savedDestinationIds, searchQuery, setSearchQuery } = useTravel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSearchModal(false);
    navigateTo('destinations');
  };

  return (
    <>
      <header
        className="no-print"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(7, 15, 30, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F19E38 0%, #E07A5F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <Compass size={24} color="#FFFFFF" strokeWidth={2.2} />
            </div>
            <div>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                Terra<span style={{ color: 'var(--accent-gold)' }}>Luxe</span>
              </span>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '-4px' }}>
                Tourism &amp; Travel Journal
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <button
              onClick={() => navigateTo('home')}
              style={{
                background: 'none',
                border: 'none',
                color: activePage === 'home' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activePage === 'home' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
            >
              Discover
            </button>
            <button
              onClick={() => navigateTo('destinations')}
              style={{
                background: 'none',
                border: 'none',
                color: activePage === 'destinations' || activePage === 'destination-detail' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activePage === 'destinations' || activePage === 'destination-detail' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
            >
              Destinations
            </button>
            <button
              onClick={() => navigateTo('blog')}
              style={{
                background: 'none',
                border: 'none',
                color: activePage === 'blog' || activePage === 'blog-detail' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activePage === 'blog' || activePage === 'blog-detail' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
            >
              Travel Stories
            </button>
            <button
              onClick={() => navigateTo('itinerary')}
              style={{
                background: 'none',
                border: 'none',
                color: activePage === 'itinerary' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activePage === 'itinerary' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
            >
              Trip Planner
            </button>
            <button
              onClick={() => navigateTo('admin')}
              id="admin-portal-nav-btn"
              style={{
                background: activePage === 'admin' ? 'rgba(241, 158, 56, 0.15)' : 'none',
                border: activePage === 'admin' ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.9rem',
                color: activePage === 'admin' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontWeight: activePage === 'admin' ? 700 : 500,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Shield size={14} color={activePage === 'admin' ? 'var(--accent-gold)' : 'currentColor'} />
              <span>Admin</span>
            </button>
          </nav>

          {/* Action Icons & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Search destinations"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '0.6rem',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => navigateTo('destinations')}
              aria-label="View Saved Destinations"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '0.6rem 0.9rem',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <Bookmark size={17} color={savedDestinationIds.length > 0 ? 'var(--accent-gold)' : 'currentColor'} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{savedDestinationIds.length}</span>
            </button>

            <button
              onClick={() => navigateTo('itinerary')}
              className="btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem', display: 'none' }}
              id="plan-trip-nav-btn"
            >
              <Sparkles size={16} />
              <span>Plan Trip</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              className="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Discover
            </button>
            <button
              onClick={() => { navigateTo('destinations'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Destinations &amp; Attractions
            </button>
            <button
              onClick={() => { navigateTo('blog'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Travel Stories &amp; Guides
            </button>
            <button
              onClick={() => { navigateTo('itinerary'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Interactive Trip Planner
            </button>
            <button
              onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
              style={{
                background: 'rgba(241, 158, 56, 0.1)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 0.8rem',
                textAlign: 'left',
                color: 'var(--accent-gold)',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Shield size={18} color="var(--accent-gold)" />
              <span>Admin Portal &amp; CMS</span>
            </button>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 15, 30, 0.8)',
            backdropFilter: 'blur(16px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh',
          }}
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="glass-card"
            style={{ width: '90%', maxWidth: '600px', padding: '1.75rem' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Search size={18} color="var(--accent-gold)" /> Search Destinations &amp; Guides
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Kerala, Jaipur, Ladakh, Goa, Varanasi..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem 0.9rem 2.8rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
                <MapPin size={18} color="var(--accent-gold)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
                >
                  Explore Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
          #plan-trip-nav-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
};
