import { INITIAL_DESTINATIONS, INITIAL_BLOG_POSTS } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

let localDestinations = [...INITIAL_DESTINATIONS];
let localBlogPosts = [...INITIAL_BLOG_POSTS];

export const travelApi = {
  async getDestinations(params) {
    try {
      const query = new URLSearchParams();
      if (params?.continent) query.append('continent', params.continent);
      if (params?.budget) query.append('budget', params.budget);
      if (params?.vibe) query.append('vibe', params.vibe);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE_URL}/destinations?${query.toString()}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend not running, fallback
    }

    return localDestinations.filter(d => {
      if (params?.continent && params.continent !== 'all' && d.continent.toLowerCase() !== params.continent.toLowerCase()) {
        return false;
      }
      if (params?.budget && params.budget !== 'all' && d.budgetLevel.toLowerCase() !== params.budget.toLowerCase()) {
        return false;
      }
      if (params?.vibe && params.vibe !== 'all' && d.travelVibe.toLowerCase() !== params.vibe.toLowerCase()) {
        return false;
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        const matches = d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q) ||
          d.continent.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  },

  async getFeaturedDestinations() {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations/featured`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localDestinations.filter(d => d.featured);
  },

  async getDestinationById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localDestinations.find(d => (d._id || d.id) === id || d.id === Number(id)) || null;
  },

  async createDestination(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const created = { id: Date.now(), ...data };
    localDestinations.push(created);
    return created;
  },

  async updateDestination(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const idx = localDestinations.findIndex(d => (d._id || d.id) === id || d.id === Number(id));
    if (idx !== -1) {
      localDestinations[idx] = { ...localDestinations[idx], ...data };
      return localDestinations[idx];
    }
    return data;
  },

  async deleteDestination(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/destinations/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) return true;
    } catch {
      // Fallback
    }
    const idx = localDestinations.findIndex(d => (d._id || d.id) === id || d.id === Number(id));
    if (idx !== -1) localDestinations.splice(idx, 1);
    return true;
  },

  async submitReview(destinationId, review) {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/destination/${destinationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const newReview = {
      ...review,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    const dest = localDestinations.find(d => d.id === Number(destinationId));
    if (dest) {
      if (!dest.reviews) dest.reviews = [];
      dest.reviews.unshift(newReview);
      dest.reviewsCount = dest.reviews.length;
      const sum = dest.reviews.reduce((acc, r) => acc + r.rating, 0);
      dest.rating = Math.round((sum / dest.reviews.length) * 10) / 10;
    }

    return newReview;
  },

  async getBlogPosts(params) {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE_URL}/blogs?${query.toString()}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    return localBlogPosts.filter(b => {
      if (params?.category && params.category !== 'all' && b.category.toLowerCase() !== params.category.toLowerCase()) {
        return false;
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        const matches = b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          (b.tags && b.tags.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  },

  async getFeaturedBlogPosts() {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/featured`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localBlogPosts.filter(b => b.featured);
  },

  async getBlogPostBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return localBlogPosts.find(b => b.slug === slug) || null;
  },

  async createBlogPost(postData) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    const slug = (postData.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newPost = {
      id: Date.now(),
      slug,
      ...postData,
      createdAt: new Date().toISOString(),
    };
    localBlogPosts.unshift(newPost);
    return newPost;
  },

  async updateBlogPost(id, postData) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const idx = localBlogPosts.findIndex(b => (b._id || b.id) === id || b.id === Number(id));
    if (idx !== -1) {
      localBlogPosts[idx] = { ...localBlogPosts[idx], ...postData };
      return localBlogPosts[idx];
    }
    return postData;
  },

  async deleteBlogPost(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) return true;
    } catch {
      // Fallback
    }
    const idx = localBlogPosts.findIndex(b => (b._id || b.id) === id || b.id === Number(id));
    if (idx !== -1) localBlogPosts.splice(idx, 1);
    return true;
  },

  async getAllReviews() {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const all = [];
    localDestinations.forEach(d => {
      if (d.reviews) {
        d.reviews.forEach(r => all.push({ ...r, destinationName: d.name }));
      }
    });
    return all;
  },

  async deleteReview(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) return true;
    } catch {
      // Fallback
    }
    return true;
  }
};
