import React, { useState, useEffect } from 'react';
import { travelApi } from '../services/api';
import { useTravel } from '../context/TravelContext';
import {
  Shield, MapPin, BookOpen, Star, Trash2, Edit3, Plus, Check, X,
  AlertTriangle, RefreshCw, Eye, Sparkles, Database, HardDrive, DollarSign,
  Calendar, Layers, Tag
} from 'lucide-react';

export const AdminPage = () => {
  const { showToast, navigateTo } = useTravel();
  const [activeTab, setActiveTab] = useState('destinations'); // 'destinations' | 'blogs' | 'reviews' | 'storage'

  // Data states
  const [destinations, setDestinations] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [destModalOpen, setDestModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState(null); // null = create mode, object = edit mode

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'dest' | 'blog' | 'review', id: string, name: string }

  // Destination Form State
  const [destForm, setDestForm] = useState({
    name: '',
    country: 'India',
    continent: 'South India',
    tagline: '',
    description: '',
    heroImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    bestSeason: 'October - March',
    currency: 'INR (₹ Indian Rupee)',
    language: 'Hindi, English',
    budgetLevel: 'Moderate',
    travelVibe: 'Cultural',
    averageDailyCost: 2500,
    rating: 4.9,
    featured: false,
  });

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Itineraries',
    destinationId: '',
    authorName: 'Admin Editor',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 6,
    excerpt: '',
    content: '',
    tags: 'India, Travel, Heritage',
    featured: false,
  });

  // Load all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [dData, bData, rData] = await Promise.all([
        travelApi.getDestinations(),
        travelApi.getBlogPosts(),
        travelApi.getAllReviews(),
      ]);
      setDestinations(dData || []);
      setBlogs(bData || []);
      setReviews(rData || []);
    } catch {
      showToast('Error loading management data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Preset image suggestions
  const presetPhotos = [
    { label: 'Kerala Backwaters', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Rajasthan Fort', url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Ladakh Lake', url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Goa Beaches', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Varanasi Ghats', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80' },
  ];

  // --------------------------------------------------------------------------
  // DESTINATION HANDLERS
  // --------------------------------------------------------------------------
  const openCreateDestModal = () => {
    setEditingDest(null);
    setDestForm({
      name: '',
      country: 'India',
      continent: 'South India',
      tagline: '',
      description: '',
      heroImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
      bestSeason: 'October - March',
      currency: 'INR (₹ Indian Rupee)',
      language: 'Hindi, English',
      budgetLevel: 'Moderate',
      travelVibe: 'Cultural',
      averageDailyCost: 2500,
      rating: 4.9,
      featured: false,
    });
    setDestModalOpen(true);
  };

  const openEditDestModal = (dest) => {
    setEditingDest(dest);
    setDestForm({
      name: dest.name || '',
      country: dest.country || 'India',
      continent: dest.continent || 'South India',
      tagline: dest.tagline || '',
      description: dest.description || '',
      heroImageUrl: dest.heroImageUrl || '',
      thumbnailUrl: dest.thumbnailUrl || '',
      bestSeason: dest.bestSeason || 'October - March',
      currency: dest.currency || 'INR (₹ Indian Rupee)',
      language: dest.language || 'Hindi, English',
      budgetLevel: dest.budgetLevel || 'Moderate',
      travelVibe: dest.travelVibe || 'Cultural',
      averageDailyCost: dest.averageDailyCost || 2500,
      rating: dest.rating || 4.9,
      featured: !!dest.featured,
    });
    setDestModalOpen(true);
  };

  const handleSaveDestination = async (e) => {
    e.preventDefault();
    try {
      if (editingDest) {
        const id = editingDest._id || editingDest.id;
        const updated = await travelApi.updateDestination(id, destForm);
        setDestinations(prev => prev.map(d => ((d._id || d.id) === id ? { ...d, ...updated } : d)));
        showToast(`Updated "${destForm.name}" successfully.`);
      } else {
        const created = await travelApi.createDestination(destForm);
        setDestinations(prev => [created, ...prev]);
        showToast(`Created destination "${destForm.name}".`);
      }
      setDestModalOpen(false);
    } catch {
      showToast('Error saving destination.');
    }
  };

  // --------------------------------------------------------------------------
  // BLOG POST HANDLERS
  // --------------------------------------------------------------------------
  const openCreateBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      category: 'Itineraries',
      destinationId: destinations[0]?._id || destinations[0]?.id || '',
      authorName: 'Admin Editor',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      coverImageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
      readTimeMinutes: 6,
      excerpt: '',
      content: '',
      tags: 'India, Travel, Heritage',
      featured: false,
    });
    setBlogModalOpen(true);
  };

  const openEditBlogModal = (post) => {
    setEditingBlog(post);
    setBlogForm({
      title: post.title || '',
      category: post.category || 'Itineraries',
      destinationId: post.destinationId || '',
      authorName: post.authorName || 'Admin Editor',
      authorAvatarUrl: post.authorAvatarUrl || '',
      coverImageUrl: post.coverImageUrl || '',
      readTimeMinutes: post.readTimeMinutes || 6,
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: post.tags || '',
      featured: !!post.featured,
    });
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        const id = editingBlog._id || editingBlog.id;
        const updated = await travelApi.updateBlogPost(id, blogForm);
        setBlogs(prev => prev.map(b => ((b._id || b.id) === id ? { ...b, ...updated } : b)));
        showToast(`Updated "${blogForm.title}".`);
      } else {
        const created = await travelApi.createBlogPost(blogForm);
        setBlogs(prev => [created, ...prev]);
        showToast(`Published "${blogForm.title}".`);
      }
      setBlogModalOpen(false);
    } catch {
      showToast('Error saving travel story.');
    }
  };

  // --------------------------------------------------------------------------
  // DELETE EXECUTION
  // --------------------------------------------------------------------------
  const executeDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id, name } = deleteConfirm;
    try {
      if (type === 'dest') {
        await travelApi.deleteDestination(id);
        setDestinations(prev => prev.filter(d => (d._id || d.id) !== id));
        showToast(`Deleted destination "${name}".`);
      } else if (type === 'blog') {
        await travelApi.deleteBlogPost(id);
        setBlogs(prev => prev.filter(b => (b._id || b.id) !== id));
        showToast(`Deleted travel story "${name}".`);
      } else if (type === 'review') {
        await travelApi.deleteReview(id);
        setReviews(prev => prev.filter(r => (r._id || r.id) !== id));
        showToast(`Deleted review.`);
      }
    } catch {
      showToast('Error deleting item.');
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Storage estimation calculations
  const totalItems = destinations.length + blogs.length + reviews.length;
  const estimatedStorageKb = Math.round(totalItems * 18); // ~18KB per average record including embedded collections
  const freeTierQuotaMb = 500;
  const usedPercentage = ((estimatedStorageKb / (freeTierQuotaMb * 1024)) * 100).toFixed(3);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.45rem' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.8rem' }}>
              <Shield size={14} /> Master Administration Portal
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.8rem' }}>
              MongoDB Atlas Live
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            TerraLuxe Content &amp; Data Control Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
            Directly create, edit, remove, and curate destinations, travel journal dispatches, and tourist reviews.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="btn-secondary"
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <RefreshCw size={15} /> Refresh MongoDB Data
        </button>
      </div>

      {/* Storage & Stat Cards Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Destinations</span>
            <MapPin size={18} color="var(--accent-gold)" />
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {destinations.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#3CD0BF' }}>
            Curated Indian Tourism Dossiers
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Journal Dispatches</span>
            <BookOpen size={18} color="#70A5FF" />
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {blogs.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Published Travel Chronicles
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Traveler Reviews</span>
            <Star size={18} color="var(--accent-coral)" />
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {reviews.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Verified Community Ratings
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>MongoDB Atlas 500MB Quota</span>
            <Database size={18} color="#2A9D8F" />
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2A9D8F' }}>
            ~{estimatedStorageKb} KB <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 500 MB</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#3CD0BF', fontWeight: 600 }}>
            {usedPercentage}% used (99.97% Free Storage Available)
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          overflowX: 'auto',
        }}
      >
        <button
          onClick={() => setActiveTab('destinations')}
          style={{
            padding: '0.65rem 1.4rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTab === 'destinations' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
            color: activeTab === 'destinations' ? '#070F1E' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <MapPin size={16} /> Destinations ({destinations.length})
        </button>

        <button
          onClick={() => setActiveTab('blogs')}
          style={{
            padding: '0.65rem 1.4rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTab === 'blogs' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
            color: activeTab === 'blogs' ? '#070F1E' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <BookOpen size={16} /> Travel Journals ({blogs.length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          style={{
            padding: '0.65rem 1.4rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTab === 'reviews' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
            color: activeTab === 'reviews' ? '#070F1E' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Star size={16} /> Reviews ({reviews.length})
        </button>
      </div>

      {/* ======================================================================
          TAB 1: DESTINATIONS MANAGEMENT
          ====================================================================== */}
      {activeTab === 'destinations' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              Indian Tourism Destinations Directory
            </h2>
            <button
              onClick={openCreateDestModal}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Plus size={16} /> Add Destination
            </button>
          </div>

          <div className="glass-card" style={{ overflowX: 'auto', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Destination</th>
                  <th style={{ padding: '1rem' }}>Region</th>
                  <th style={{ padding: '1rem' }}>Daily Cost</th>
                  <th style={{ padding: '1rem' }}>Vibe &amp; Tier</th>
                  <th style={{ padding: '1rem' }}>Rating</th>
                  <th style={{ padding: '1rem' }}>Featured</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map(dest => {
                  const id = dest._id || dest.id;
                  return (
                    <tr key={id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={dest.thumbnailUrl || dest.heroImageUrl}
                            alt={dest.name}
                            style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{dest.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dest.country}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                          {dest.continent}
                        </span>
                      </td>

                      <td style={{ padding: '1rem', fontWeight: 600, color: '#3CD0BF' }}>
                        ₹{Number(dest.averageDailyCost || 0).toLocaleString('en-IN')} <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/ day</span>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div>{dest.travelVibe}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dest.budgetLevel}</div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600, color: '#FFD166' }}>
                          <Star size={13} fill="#FFD166" /> {dest.rating || 4.9}
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>({dest.reviewsCount || 0})</span>
                        </div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        {dest.featured ? (
                          <span style={{ color: '#2A9D8F', fontWeight: 700, fontSize: '0.8rem' }}>Yes</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No</span>
                        )}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            onClick={() => navigateTo('destination-detail', id)}
                            className="btn-secondary"
                            title="View Destination Page"
                            style={{ padding: '0.4rem 0.6rem', fontSize: '0.78rem' }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => openEditDestModal(dest)}
                            className="btn-secondary"
                            title="Edit Destination"
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', color: 'var(--accent-gold)' }}
                          >
                            <Edit3 size={14} /> Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'dest', id, name: dest.name })}
                            className="btn-secondary"
                            title="Delete Destination"
                            style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem', color: '#E07A5F', borderColor: 'rgba(224, 122, 95, 0.4)' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================================
          TAB 2: BLOG & TRAVEL JOURNAL POSTS MANAGEMENT
          ====================================================================== */}
      {activeTab === 'blogs' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              Travel Journal Dispatches &amp; Articles
            </h2>
            <button
              onClick={openCreateBlogModal}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Plus size={16} /> New Journal Dispatch
            </button>
          </div>

          <div className="glass-card" style={{ overflowX: 'auto', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Story Title</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Author</th>
                  <th style={{ padding: '1rem' }}>Read Time</th>
                  <th style={{ padding: '1rem' }}>Featured</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(post => {
                  const id = post._id || post.id;
                  return (
                    <tr key={id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={post.coverImageUrl}
                            alt={post.title}
                            style={{ width: '48px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)', maxWidth: '340px' }}>
                              {post.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              slug: {post.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                          {post.category}
                        </span>
                      </td>

                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                        {post.authorName}
                      </td>

                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                        {post.readTimeMinutes} min
                      </td>

                      <td style={{ padding: '1rem' }}>
                        {post.featured ? (
                          <span style={{ color: '#2A9D8F', fontWeight: 700, fontSize: '0.8rem' }}>Yes</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No</span>
                        )}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            onClick={() => navigateTo('blog-detail', post.slug)}
                            className="btn-secondary"
                            title="View Story Page"
                            style={{ padding: '0.4rem 0.6rem', fontSize: '0.78rem' }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => openEditBlogModal(post)}
                            className="btn-secondary"
                            title="Edit Story"
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', color: 'var(--accent-gold)' }}
                          >
                            <Edit3 size={14} /> Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ type: 'blog', id, name: post.title })}
                            className="btn-secondary"
                            title="Delete Story"
                            style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem', color: '#E07A5F', borderColor: 'rgba(224, 122, 95, 0.4)' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================================
          TAB 3: REVIEWS MODERATION
          ====================================================================== */}
      {activeTab === 'reviews' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              Traveler Reviews &amp; Moderation
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Total Verified Reviews: {reviews.length}
            </div>
          </div>

          <div className="glass-card" style={{ overflowX: 'auto', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Traveler</th>
                  <th style={{ padding: '1rem' }}>Rating</th>
                  <th style={{ padding: '1rem' }}>Review Comment</th>
                  <th style={{ padding: '1rem' }}>Trip Context</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Moderation</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => {
                  const id = r._id || r.id;
                  return (
                    <tr key={id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.authorName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.travelDate || 'Recently'}</div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#FFD166' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < r.rating ? '#FFD166' : 'none'} color="#FFD166" />
                          ))}
                        </div>
                      </td>

                      <td style={{ padding: '1rem', color: 'var(--text-secondary)', maxWidth: '380px' }}>
                        {r.comment || r.content}
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                          {r.travelType || r.travelerType || 'Solo'}
                        </span>
                      </td>

                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'review', id, name: `Review by ${r.authorName}` })}
                          className="btn-secondary"
                          title="Delete / Remove Review"
                          style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem', color: '#E07A5F', borderColor: 'rgba(224, 122, 95, 0.4)' }}
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================================
          DESTINATION CREATE / EDIT MODAL
          ====================================================================== */}
      {destModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
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
              maxWidth: '740px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(241, 158, 56, 0.4)',
              background: '#0B192C',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                {editingDest ? `Edit Destination: ${editingDest.name}` : 'Add New Indian Destination'}
              </h3>
              <button onClick={() => setDestModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveDestination} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Destination Name *</label>
                  <input
                    type="text"
                    required
                    value={destForm.name}
                    onChange={e => setDestForm({ ...destForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Region / Zone *</label>
                  <select
                    value={destForm.continent}
                    onChange={e => setDestForm({ ...destForm, continent: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#070F1E', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  >
                    <option value="North India">North India</option>
                    <option value="South India">South India</option>
                    <option value="West India">West India</option>
                    <option value="Himalayas">Himalayas</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Average Daily Cost in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={destForm.averageDailyCost}
                    onChange={e => setDestForm({ ...destForm, averageDailyCost: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Editorial Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. God's Own Country: Emerald Backwaters & Mist-Veiled Tea Plantations"
                  value={destForm.tagline}
                  onChange={e => setDestForm({ ...destForm, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Comprehensive Description</label>
                <textarea
                  rows={3}
                  value={destForm.description}
                  onChange={e => setDestForm({ ...destForm, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Best Season</label>
                  <input
                    type="text"
                    value={destForm.bestSeason}
                    onChange={e => setDestForm({ ...destForm, bestSeason: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Budget Level</label>
                  <select
                    value={destForm.budgetLevel}
                    onChange={e => setDestForm({ ...destForm, budgetLevel: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#070F1E', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  >
                    <option value="Budget">Budget</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Travel Vibe</label>
                  <select
                    value={destForm.travelVibe}
                    onChange={e => setDestForm({ ...destForm, travelVibe: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#070F1E', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  >
                    <option value="Cultural">Cultural</option>
                    <option value="Coastal">Coastal</option>
                    <option value="Alpine">Alpine</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
                  <input
                    type="checkbox"
                    id="dest-featured-checkbox"
                    checked={destForm.featured}
                    onChange={e => setDestForm({ ...destForm, featured: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                  />
                  <label htmlFor="dest-featured-checkbox" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                    Featured on Home Page
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Hero Image URL</label>
                <input
                  type="url"
                  value={destForm.heroImageUrl}
                  onChange={e => setDestForm({ ...destForm, heroImageUrl: e.target.value, thumbnailUrl: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none', marginBottom: '0.4rem' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {presetPhotos.map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setDestForm({ ...destForm, heroImageUrl: p.url, thumbnailUrl: p.url })}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: '4px', color: 'var(--text-secondary)', cursor: 'pointer' }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setDestModalOpen(false)} className="btn-secondary" style={{ padding: '0.6rem 1.3rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.6rem' }}>
                  {editingDest ? 'Save Changes' : 'Create Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================
          BLOG EDIT / CREATE MODAL
          ====================================================================== */}
      {blogModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
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
              maxWidth: '740px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(241, 158, 56, 0.4)',
              background: '#0B192C',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                {editingBlog ? `Edit Travel Story: ${editingBlog.title}` : 'Publish New Journal Dispatch'}
              </h3>
              <button onClick={() => setBlogModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Story Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Category</label>
                  <select
                    value={blogForm.category}
                    onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#070F1E', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  >
                    <option value="Itineraries">Itineraries</option>
                    <option value="Adventure Guides">Adventure Guides</option>
                    <option value="Heritage Guides">Heritage Guides</option>
                    <option value="Travel Hacks">Travel Hacks</option>
                    <option value="Culinary Travel">Culinary Travel</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Author Name</label>
                  <input
                    type="text"
                    value={blogForm.authorName}
                    onChange={e => setBlogForm({ ...blogForm, authorName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Read Time (Mins)</label>
                  <input
                    type="number"
                    min="1"
                    value={blogForm.readTimeMinutes}
                    onChange={e => setBlogForm({ ...blogForm, readTimeMinutes: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Summary Excerpt</label>
                <input
                  type="text"
                  value={blogForm.excerpt}
                  onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Story Content (Markdown supported)</label>
                <textarea
                  rows={6}
                  value={blogForm.content}
                  onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#FFFFFF', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="blog-featured-checkbox"
                  checked={blogForm.featured}
                  onChange={e => setBlogForm({ ...blogForm, featured: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                />
                <label htmlFor="blog-featured-checkbox" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  Feature Story on Front Page &amp; Top Stories
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setBlogModalOpen(false)} className="btn-secondary" style={{ padding: '0.6rem 1.3rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.6rem' }}>
                  {editingBlog ? 'Save Changes' : 'Publish Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================
          DELETE CONFIRMATION MODAL
          ====================================================================== */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
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
              maxWidth: '460px',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(224, 122, 95, 0.5)',
              background: '#0B192C',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(224, 122, 95, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <AlertTriangle size={24} color="#E07A5F" />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Confirm Permanent Deletion
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Are you sure you want to delete <strong style={{ color: '#FFFFFF' }}>"{deleteConfirm.name}"</strong>? This will permanently erase it from MongoDB Atlas.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.4rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                style={{
                  background: '#E07A5F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.6rem 1.6rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
