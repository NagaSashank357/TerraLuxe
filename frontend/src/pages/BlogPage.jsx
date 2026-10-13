import React, { useState } from 'react';
import { BlogPostCard } from '../components/BlogPostCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useDestinations } from '../hooks/useDestinations';
import { useTravel } from '../context/TravelContext';
import { travelApi } from '../services/api';
import { BookOpen, Search, Filter, PenSquare, X, Sparkles, Image, Check, Clock, Tag, User } from 'lucide-react';

export const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useTravel();

  const { posts, loading, refetch } = useBlogPosts({
    category: selectedCategory,
    search: search,
  });

  const { destinations } = useDestinations();

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Itineraries');
  const [destinationId, setDestinationId] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState(6);
  const [coverImageUrl, setCoverImageUrl] = useState('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const categories = ['all', 'Itineraries', 'Adventure Guides', 'Heritage Guides', 'Travel Hacks', 'Culinary Travel'];

  const presetImages = [
    { label: 'Kerala Backwaters', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Rajasthan Fort', url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Himalayas / Ladakh', url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Goa Coastal', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Varanasi Ghats', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Please provide a title and journal content.');
      return;
    }

    setIsSubmitting(true);
    try {
      await travelApi.createBlogPost({
        title: title.trim(),
        destinationId: destinationId || (destinations[0]?._id || destinations[0]?.id || ''),
        category,
        authorName: authorName.trim() || 'Anonymous Explorer',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        coverImageUrl: coverImageUrl.trim(),
        readTimeMinutes: Number(readTimeMinutes) || 5,
        excerpt: excerpt.trim() || title.trim(),
        content: content.trim(),
        tags: tags.trim() || 'India, Travel, Journal',
        featured: false,
      });

      showToast('🎉 Travel journal dispatch successfully published!');
      setShowModal(false);

      // Reset form
      setTitle('');
      setExcerpt('');
      setContent('');
      setTags('');
      setAuthorName('');

      // Refresh listings
      if (refetch) refetch();
    } catch {
      showToast('Failed to publish journal dispatch.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
          <BookOpen size={13} /> The Expedition Journal
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '0.85rem' }}>
          Chronicles of Indian Discovery
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Detailed step-by-step itineraries, camera gear packing guides, and insider travel stories written from the field across India.
        </p>
      </div>

      {/* Filter, Search & Publish Action Bar */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--accent-gold)' : 'var(--border-subtle)',
                background: selectedCategory === cat ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat ? '#070F1E' : 'var(--text-secondary)',
                fontWeight: selectedCategory === cat ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat === 'all' ? 'All Stories' : cat}
            </button>
          ))}
        </div>

        {/* Search & Write Dispatch Button */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', flex: '1 1 300px', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', minWidth: '200px', flex: '1 1 200px', maxWidth: '320px' }}>
            <input
              type="text"
              placeholder="Search travel stories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
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

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.86rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              whiteSpace: 'nowrap',
            }}
          >
            <PenSquare size={15} /> Write Journal Dispatch
          </button>
        </div>
      </div>

      {/* Grid or Empty */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          Retrieving travel articles from MongoDB Atlas...
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '520px', margin: '0 auto' }}>
          <Filter size={36} color="var(--accent-gold)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No Articles Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            No published stories match your current search criteria.
          </p>
          <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
            Be the First to Publish a Journal
          </button>
        </div>
      ) : (
        <div className="grid-cards">
          {posts.map(post => (
            <BlogPostCard key={post._id || post.id || post.slug} post={post} />
          ))}
        </div>
      )}

      {/* ======================================================================
          INTERACTIVE "WRITE TRAVEL JOURNAL DISPATCH" MODAL
          ====================================================================== */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(241, 158, 56, 0.3)',
              position: 'relative',
              background: '#0B192C',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--accent-gold-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PenSquare size={18} color="var(--accent-gold)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Publish Travel Journal Dispatch</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Add real-time expedition notes &amp; stories directly to MongoDB Atlas
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.4rem',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Journal Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dawn over Dal Lake: Shikaras, Lotus Greens &amp; Floating Markets"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Category, Destination & Read Time Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: '#070F1E',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Itineraries">Itineraries</option>
                    <option value="Adventure Guides">Adventure Guides</option>
                    <option value="Heritage Guides">Heritage Guides</option>
                    <option value="Travel Hacks">Travel Hacks</option>
                    <option value="Culinary Travel">Culinary Travel</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Linked Destination
                  </label>
                  <select
                    value={destinationId}
                    onChange={e => setDestinationId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: '#070F1E',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">General India / Cross-Country</option>
                    {destinations.map(d => (
                      <option key={d._id || d.id} value={d._id || d.id}>{d.name} ({d.continent})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Est. Read Time (mins)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={readTimeMinutes}
                    onChange={e => setReadTimeMinutes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Author & Tags */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vikram Sen"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Keywords &amp; Tags
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kerala, Houseboat, Cuisine, Backwaters"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Summary Excerpt (1-2 sentences)
                </label>
                <input
                  type="text"
                  placeholder="A short teaser that appears on the journal card..."
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Cover Image URL with quick presets */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Cover Image URL
                  </label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>
                    Click a preset photo below or paste custom URL
                  </span>
                </div>
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={e => setCoverImageUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    marginBottom: '0.5rem',
                  }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {presetImages.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setCoverImageUrl(item.url)}
                      style={{
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.75rem',
                        background: coverImageUrl === item.url ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                        color: coverImageUrl === item.url ? '#070F1E' : 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Story Content */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Journal Body &amp; Narrative (Markdown supported) *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder={`Write your experiential narrative here...\n\n### Morning Expedition\nWe departed Assi Ghat just as the dawn mists began lifting...\n\n### Insider Recommendation\nAlways order the kulhad chai from the wood-fired tea stalls near the temple steps.`}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.8rem', fontSize: '0.9rem', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish to Journal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
