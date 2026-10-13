import React from 'react';
import { useTravel } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostDetailPage } from './pages/BlogPostDetailPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { AdminPage } from './pages/AdminPage';
import { CheckCircle2 } from 'lucide-react';

export const App = () => {
  const { activePage, toast } = useTravel();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'destinations':
        return <DestinationsPage />;
      case 'destination-detail':
        return <DestinationDetailPage />;
      case 'blog':
        return <BlogPage />;
      case 'blog-detail':
        return <BlogPostDetailPage />;
      case 'itinerary':
        return <ItineraryPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {renderActivePage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      {toast && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 999,
            background: 'rgba(16, 33, 56, 0.95)',
            border: '1px solid var(--accent-gold)',
            color: '#FFFFFF',
            padding: '0.85rem 1.4rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-lg), 0 0 20px rgba(241, 158, 56, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} color="var(--accent-gold)" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default App;
