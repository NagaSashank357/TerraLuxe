import { useState, useEffect } from 'react';
import { travelApi } from '../services/api';

export const useDestinations = (params) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    travelApi.getDestinations(params)
      .then(data => {
        if (isMounted) {
          setDestinations(data);
          setError(null);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch destinations');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [params?.continent, params?.budget, params?.vibe, params?.search]);

  return { destinations, loading, error };
};
