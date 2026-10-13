import React, { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { travelApi } from '../services/api';
import { ArrowLeft, Clock, BookOpen, Share2, Compass, CheckCircle2 } from 'lucide-react';

export const BlogPostDetailPage = () => {
  const { selectedBlogSlug, navigateTo, showToast } = useTravel();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedBlogSlug) return;

    setLoading(true);
    travelApi.getBlogPostBySlug(selectedBlogSlug)
      .then(data => {
        setPost(data);
      })
      .catch(() => {
        setPost(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedBlogSlug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>Loading article...</h3>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Article Not Found</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We could not locate this travel chronicle.</p>
        <button onClick={() => navigateTo('blog')} className="btn-primary">
          <ArrowLeft size={16} /> Return to Travel Stories
        </button>
      </div>
    );
  }

  // Helper to render basic markdown paragraphs and headings
  const renderFormattedContent = (content) => {
    return content.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} style={{ fontSize: '1.45rem', fontWeight: 700, margin: '2rem 0 0.8rem', color: 'var(--text-primary)' }}>
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('- ')) {
        const lines = block.split('\n');
        return (
          <ul key={idx} style={{ paddingLeft: '1.5rem', margin: '0.75rem 0', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {lines.map((li, lIdx) => (
              <li key={lIdx}>{li.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
          {block}
        </p>
      );
    });
  };

  return (
    <article className="container" style={{ padding: '3.5rem 1.5rem 6rem', maxWidth: '860px' }}>
      {/* Back button */}
      <button
        onClick={() => navigateTo('blog')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--accent-gold)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '2rem',
        }}
      >
        <ArrowLeft size={16} /> All Travel Stories
      </button>

      {/* Meta header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
          <BookOpen size={12} /> {post.category}
        </span>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {post.authorAvatarUrl ? (
              <img
                src={post.authorAvatarUrl}
                alt={post.authorName}
                style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold-subtle)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                {post.authorName ? post.authorName[0] : 'A'}
              </div>
            )}

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{post.authorName}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {post.publishedAt || 'Field Contributor'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={15} color="var(--accent-gold)" /> {post.readTimeMinutes} min read
            </span>

            <button
              onClick={() => {
                showToast('Article link copied to clipboard!');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.85rem',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
              }}
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
        <img
          src={post.coverImageUrl}
          alt={post.title}
          style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
        />
      </div>

      {/* Excerpt callout */}
      <div
        style={{
          borderLeft: '4px solid var(--accent-gold)',
          background: 'rgba(241, 158, 56, 0.06)',
          padding: '1.25rem 1.75rem',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          fontSize: '1.15rem',
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}
      >
        {post.excerpt}
      </div>

      {/* Main Body */}
      <div style={{ marginBottom: '3.5rem' }}>
        {renderFormattedContent(post.content)}
      </div>

      {/* Related Destination Shortcut */}
      {post.destinationId && (
        <div
          className="glass-card"
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            background: 'linear-gradient(135deg, rgba(16, 33, 56, 0.9) 0%, rgba(11, 25, 44, 0.95) 100%)',
            border: '1px solid rgba(241, 158, 56, 0.3)',
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} color="var(--accent-gold)" /> Explore Destination Dossier
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Access full attractions, entrance fees, and climate guides for this location.
            </p>
          </div>

          <button
            onClick={() => navigateTo('destination-detail', post.destinationId)}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
          >
            View Full Guide
          </button>
        </div>
      )}
    </article>
  );
};
