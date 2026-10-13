import React from 'react';
import { ItineraryPlanner } from '../components/ItineraryPlanner';
import { Sparkles, Shield, CheckCircle, Luggage } from 'lucide-react';

export const ItineraryPage = () => {
  return (
    <div className="container itinerary-page-wrapper" style={{ padding: '3.5rem 1.5rem 5rem' }}>
      {/* Page Title (Hidden in Print) */}
      <div className="no-print" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={13} /> Interactive Travel Architect
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '0.85rem' }}>
          Tailor Your Indian Expedition
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Set your preferred duration, select your comfort tier, and instantly calculate dynamic budget estimates with morning-to-night pacing.
        </p>
      </div>

      {/* Main Interactive Planner */}
      <div style={{ marginBottom: '4rem' }}>
        <ItineraryPlanner />
      </div>

      {/* Traveler Packing & Readiness Checklist (Hidden in Print) */}
      <section className="glass-card no-print" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <Luggage size={24} color="var(--accent-gold)" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            Essential Traveler Preparation Checklist
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#3CD0BF', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} /> Visas &amp; Entry Permits
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Check passport expiration (minimum 6 months validity required) and complete digital arrival customs declarations online 72h prior.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} /> Currency &amp; UPI Payments
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              UPI (Google Pay, PhonePe, Paytm) works virtually everywhere across India. Keep ₹1,500 - ₹2,500 in cash notes for remote highway dhabas, autorickshaws &amp; local temple offerings.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-coral)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} /> Travel Health &amp; Shield
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Secure international medical evacuation insurance and download offline Google/Maps.me navigation tiles before boarding.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
