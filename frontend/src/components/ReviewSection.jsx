import React, { useState } from 'react';
import { Star, MessageSquare, Send, User } from 'lucide-react';
import { travelApi } from '../services/api';
import { useTravel } from '../context/TravelContext';

export const ReviewSection = ({
  destinationId,
  initialReviews = [],
  rating,
  reviewsCount,
}) => {
  const { showToast } = useTravel();
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [travelType, setTravelType] = useState('Solo');
  const [visitedDate, setVisitedDate] = useState('Recently');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      showToast('Please fill out your name and review comment.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await travelApi.submitReview(destinationId, {
        authorName: authorName.trim(),
        authorAvatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
        rating: selectedRating,
        comment: comment.trim(),
        travelType,
        visitedDate,
      });

      setReviews(prev => [created, ...prev]);
      setAuthorName('');
      setComment('');
      setShowForm(false);
      showToast('Thank you! Your travel review has been published.');
    } catch {
      showToast('Unable to submit review right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MessageSquare size={22} color="var(--accent-gold)" /> Traveler Reviews &amp; Ratings
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={16}
                  fill={star <= Math.round(rating) ? '#F19E38' : 'none'}
                  color="#F19E38"
                />
              ))}
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF' }}>{rating}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              ({reviewsCount} traveler {reviewsCount === 1 ? 'evaluation' : 'evaluations'})
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
          style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
        >
          {showForm ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {/* Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Share Your Firsthand Experience</h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Maya Chen"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  background: 'rgba(7, 15, 30, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Travel Party
              </label>
              <select
                value={travelType}
                onChange={e => setTravelType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  background: 'rgba(7, 15, 30, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="Solo">Solo Traveler</option>
                <option value="Couple">Couple / Romance</option>
                <option value="Family">Family Trip</option>
                <option value="Friends">Friends Group</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Date Visited
              </label>
              <input
                type="text"
                placeholder="e.g. October 2026"
                value={visitedDate}
                onChange={e => setVisitedDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  background: 'rgba(7, 15, 30, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Star Rating Selection */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Your Star Rating ({selectedRating} / 5)
            </label>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.2rem',
                  }}
                >
                  <Star
                    size={24}
                    fill={(hoverRating || selectedRating) >= star ? '#F19E38' : 'none'}
                    color="#F19E38"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment text */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Review &amp; Advice for Future Visitors
            </label>
            <textarea
              rows={4}
              placeholder="What were the highlights? Best transport tips, safety tips, or secret viewpoints?"
              value={comment}
              onChange={e => setComment(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(7, 15, 30, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ padding: '0.75rem 1.6rem' }}
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Publishing...' : 'Submit Review'}</span>
          </button>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'var(--text-muted)' }}>
          <User size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
          <p>No traveler reviews yet. Be the first explorer to leave an evaluation!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {reviews.map((rev, idx) => (
            <div
              key={rev._id || rev.id || idx}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {rev.authorAvatarUrl ? (
                    <img
                      src={rev.authorAvatarUrl}
                      alt={rev.authorName}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'var(--accent-gold-subtle)',
                        color: 'var(--accent-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {rev.authorName ? rev.authorName[0] : 'U'}
                    </div>
                  )}

                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{rev.authorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {rev.travelType && <span>{rev.travelType} Traveler</span>}
                      {rev.visitedDate && <span>• Visited {rev.visitedDate}</span>}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={14}
                      fill={star <= rev.rating ? '#F19E38' : 'none'}
                      color="#F19E38"
                    />
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
