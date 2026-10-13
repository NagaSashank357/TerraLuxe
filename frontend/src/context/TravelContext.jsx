import React, { createContext, useContext, useState, useEffect } from 'react';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeContinent, setActiveContinent] = useState('all');
  const [activeBudget, setActiveBudget] = useState('all');
  const [activeVibe, setActiveVibe] = useState('all');

  const [savedDestinationIds, setSavedDestinationIds] = useState(() => {
    try {
      const saved = localStorage.getItem('terraluxe_saved_destinations');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('terraluxe_saved_destinations', JSON.stringify(savedDestinationIds));
    } catch {
      // Storage error
    }
  }, [savedDestinationIds]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const toggleSaveDestination = (id) => {
    if (savedDestinationIds.includes(id)) {
      setSavedDestinationIds(prev => prev.filter(item => item !== id));
      showToast('Removed destination from your travel wishlist.');
    } else {
      setSavedDestinationIds(prev => [...prev, id]);
      showToast('Saved to your travel wishlist!');
    }
  };

  const isSaved = (id) => savedDestinationIds.includes(id);

  const navigateTo = (page, param) => {
    if (page === 'destination-detail' && param !== undefined) {
      setSelectedDestinationId(param);
    } else if (page === 'blog-detail' && param !== undefined) {
      setSelectedBlogSlug(param);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <TravelContext.Provider
      value={{
        activePage,
        selectedDestinationId,
        selectedBlogSlug,
        navigateTo,
        searchQuery,
        setSearchQuery,
        activeContinent,
        setActiveContinent,
        activeBudget,
        setActiveBudget,
        activeVibe,
        setActiveVibe,
        savedDestinationIds,
        toggleSaveDestination,
        isSaved,
        toast,
        showToast,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
