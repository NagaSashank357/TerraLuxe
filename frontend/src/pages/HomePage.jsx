import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { DestinationCard } from '../components/DestinationCard';
import { BlogPostCard } from '../components/BlogPostCard';
import { NewsletterCTA } from '../components/NewsletterCTA';
import { useDestinations } from '../hooks/useDestinations';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useTravel } from '../context/TravelContext';
import { ArrowRight, Compass, Sparkles, Map, Mountain, Sun, Landmark } from 'lucide-react';

export const HomePage = () => {
  const { navigateTo, setActiveContinent } = useTravel();
  const { destinations, loading: destLoading } = useDestinations();
  const { posts, loading: postLoading } = useBlogPosts();

  const featuredDestinations = destinations.slice(0, 3);
  const featuredPosts = posts.slice(0, 3);

  const categories = [
    { title: 'Royal Heritage & Palaces', count: 'North India', icon: Landmark, continent: 'North India' },
    { title: 'Himalayan Passes & Lakes', count: 'Himalayas', icon: Mountain, continent: 'Himalayas' },
    { title: 'Backwaters & Ayurvedic Coast', count: 'South India', icon: Compass, continent: 'South India' },
    { title: 'Golden Sands & Coastal Susegad', count: 'West India', icon: Sun, continent: 'West India' },
  ];

  return (
    <div>
      {/* Cinematic Hero */}
      <HeroBanner />

      <div className="container" style={{ padding: '4rem 1.5rem 0' }}>
        {/* Curated Tourism Highlights / Categories */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.65rem' }}>
              <Compass size={13} /> Tailored Exploration
            </span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800 }}>
              Curated Across Wonder &amp; Geography
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  className="glass-card"
                  onClick={() => {
                    setActiveContinent(cat.continent);
                    navigateTo('destinations');
                  }}
                  style={{
                    padding: '1.75rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.1rem',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '14px',
                      background: 'rgba(241, 158, 56, 0.12)',
                      border: '1px solid rgba(241, 158, 56, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={24} color="var(--accent-gold)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {cat.title}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {cat.count} • Explore
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Destinations Section */}
        <section style={{ marginBottom: '5.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                <Sparkles size={13} /> Editor&apos;s Signature Selection
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Featured Tourism Dossiers</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                Handcrafted destination guides featuring entrance fees, local etiquette, and verified reviews.
              </p>
            </div>

            <button
              onClick={() => navigateTo('destinations')}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
            >
              <span>View All Destinations</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {destLoading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              Loading top destinations...
            </div>
          ) : (
            <div className="grid-cards">
              {featuredDestinations.map(destination => (
                <DestinationCard key={destination._id || destination.id} destination={destination} />
              ))}
            </div>
          )}
        </section>

        {/* Trip Planner Teaser Banner */}
        <section
          className="glass-card"
          style={{
            marginBottom: '5.5rem',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            background: 'linear-gradient(135deg, rgba(16, 33, 56, 0.95) 0%, rgba(14, 27, 46, 0.9) 100%)',
            border: '1px solid rgba(241, 158, 56, 0.3)',
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              <Map size={13} /> Interactive Travel Planner
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Build Your Custom Day-by-Day Journey
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6 }}>
              Estimate daily costs, balance active treks with local gastro tours, and access printable step-by-step itineraries designed by travel specialists.
            </p>
          </div>

          <button
            onClick={() => navigateTo('itinerary')}
            className="btn-primary"
            style={{ padding: '0.9rem 1.8rem', fontSize: '0.95rem' }}
          >
            <Sparkles size={18} />
            <span>Open Trip Planner</span>
          </button>
        </section>

        {/* Latest Travel Stories Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>
                Field Chronicles
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Stories from the Road</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                In-depth essays, camera advice, and candid reviews by seasoned travel contributors.
              </p>
            </div>

            <button
              onClick={() => navigateTo('blog')}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
            >
              <span>Explore All Articles</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {postLoading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              Loading travel stories...
            </div>
          ) : (
            <div className="grid-cards">
              {featuredPosts.map(post => (
                <BlogPostCard key={post._id || post.id || post.slug} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Subscription Banner */}
        <NewsletterCTA />
      </div>
    </div>
  );
};
