import React from 'react';
import { Clock, BookOpen, ArrowUpRight } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const BlogPostCard = ({ post }) => {
  const { navigateTo } = useTravel();

  return (
    <article
      className="glass-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={() => navigateTo('blog-detail', post.slug)}
    >
      {/* Cover Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={post.coverImageUrl}
          alt={post.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.45s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7, 15, 30, 0.1) 0%, rgba(7, 15, 30, 0.7) 100%)',
          }}
        />

        {/* Category Badge */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
            <BookOpen size={11} /> {post.category}
          </span>
        </div>

        {/* Read time */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.85rem',
            right: '1rem',
            background: 'rgba(7, 15, 30, 0.75)',
            backdropFilter: 'blur(8px)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          <Clock size={12} color="var(--accent-gold)" />
          <span>{post.readTimeMinutes} min read</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            marginBottom: '0.65rem',
            lineHeight: 1.35,
            color: 'var(--text-primary)',
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.4rem',
            lineClamp: 3,
            WebkitLineClamp: 3,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        {/* Author Footer */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {post.authorAvatarUrl ? (
              <img
                src={post.authorAvatarUrl}
                alt={post.authorName}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold-subtle)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                }}
              >
                {post.authorName ? post.authorName[0] : 'T'}
              </div>
            )}
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{post.authorName}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{post.publishedAt || 'Curated Guide'}</div>
            </div>
          </div>

          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            Read <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
};
