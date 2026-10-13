import { useState, useEffect } from 'react';
import { travelApi } from '../services/api';

export const useBlogPosts = (params) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    travelApi.getBlogPosts(params)
      .then(data => {
        if (isMounted) {
          setPosts(data);
          setError(null);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch blog posts');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [params?.category, params?.search]);

  const refetch = async () => {
    setLoading(true);
    try {
      const data = await travelApi.getBlogPosts(params);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, refetch };
};
