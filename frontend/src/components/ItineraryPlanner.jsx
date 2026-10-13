import React, { useState } from 'react';
import { Sparkles, Share2, Printer, MapPin, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const ItineraryPlanner = () => {
  const { showToast } = useTravel();
  const [selectedDestination, setSelectedDestination] = useState('Kerala Backwaters & Munnar');
  const [durationDays, setDurationDays] = useState(5);
  const [travelStyle, setTravelStyle] = useState('Comfort');

  const destinationRates = {
    'Kerala Backwaters & Munnar': { base: 2800, currency: 'INR' },
    'Jaipur & Udaipur': { base: 3800, currency: 'INR' },
    'Ladakh & Pangong Tso': { base: 3200, currency: 'INR' },
    'Goa (Shores & Heritage)': { base: 2200, currency: 'INR' },
    'Varanasi (Kashi)': { base: 1600, currency: 'INR' },
  };

  const styleMultiplier = {
    Budget: 0.65,
    Comfort: 1.0,
    Luxury: 2.2,
  };

  const baseRate = destinationRates[selectedDestination]?.base || 2800;
  const dailyRate = Math.round(baseRate * styleMultiplier[travelStyle]);
  const totalCost = dailyRate * durationDays;

  // Curated, authentic Indian itineraries for each destination
  const itinerariesByDestination = {
    'Kerala Backwaters & Munnar': [
      {
        day: 1,
        title: 'Kochi Arrival & Mattancherry Spice Heritage',
        morning: 'Arrive at Cochin Airport (COK). Private transfer to heritage boutique hotel in Fort Kochi with fresh tender coconut welcome.',
        afternoon: 'Guided stroll through Jew Town, Dutch Palace (Mattancherry), and cantilevered Chinese fishing nets along the harbour.',
        evening: 'Sunset Kathakali classical dance & Kalaripayattu performance, followed by Malabar coastal dinner with fresh appams.'
      },
      {
        day: 2,
        title: 'Munnar Tea Highlands & Cheeyappara Falls',
        morning: 'Scenic morning drive ascending the Western Ghats (1,600m), stopping at gushing Cheeyappara and Valara waterfalls.',
        afternoon: 'Check-in to tea estate bungalow. Guided walking tour through emerald tea hills and spice-scented cardamom trails.',
        evening: 'Visit the Tata Tea Museum for orthodox leaf processing insights. Savor hot spiced Cardamom Chai beside a hearth.'
      },
      {
        day: 3,
        title: 'Eravikulam Wildlife Sanctuary & Top Station Vista',
        morning: 'Early morning safari walk in Eravikulam National Park to spot endangered Nilgiri Tahr beneath towering Anamudi Peak.',
        afternoon: 'Drive to historic Top Station for breathtaking panoramic views of the Western Ghats crest as mountain mists roll in.',
        evening: 'Traditional Kerala Sadya banquet served on fresh plantain leaves with avial, thoran, and roasted pappadams.'
      },
      {
        day: 4,
        title: 'Alleppey Kettuvallam Houseboat Embarkation',
        morning: 'Descent toward Vembanad Lake. Board your private handcrafted wooden kettuvallam houseboat at Punnamada Jetty by noon.',
        afternoon: 'Leisurely cruise along palm-fringed backwaters, lotus ponds, and coir hamlets. On-board chef prepares fresh Karimeen fish.',
        evening: 'Anchor peacefully in secluded backwater lagoons under starlit skies. Candlelit dinner served on the open front deck.'
      },
      {
        day: 5,
        title: 'Village Canoe Expedition & Ayurvedic Wellness',
        morning: 'Sunrise wooden canoe ride through narrow shallow canals inaccessible to larger craft. Observe duck herding and village life.',
        afternoon: 'Disembark at Alleppey. Rejuvenating 90-minute traditional Abhyanga herbal oil massage at a certified Ayurvedic center.',
        evening: 'Twilight stroll along Alleppey Beach and historic pier. Sample hot banana fritters (pazham pori) and filter coffee.'
      },
      {
        day: 6,
        title: 'Marari Beach Relaxation & Coastal Susegad',
        morning: 'Drive to tranquil Marari Beach. Stroll along pristine golden sands bordered by swaying coconut palms.',
        afternoon: 'Visit a local organic coir artisan cooperative. Relax in seaside hammocks with fresh coconut water.',
        evening: 'Farewell beachside grill dinner featuring jumbo tiger prawns spiced with freshly ground pepper and coconut rice.'
      },
      {
        day: 7,
        title: 'Spice Souvenir Shopping & Departure',
        morning: 'Breakfast with warm appams and coconut stew. Pick up vacuum-sealed Malabar black pepper, green cardamom, and banana chips.',
        afternoon: 'Comfortable private transfer to Cochin Airport (COK) for your onward flight home.',
        evening: 'Homeward journey carrying peaceful backwater memories.'
      }
    ],
    'Jaipur & Udaipur': [
      {
        day: 1,
        title: 'Jaipur Pink City Arrival & Hawa Mahal Dusk',
        morning: 'Arrive in Jaipur. Check into royal heritage haveli hotel with traditional marigold garland and tikka welcome.',
        afternoon: 'Visit City Palace complex and Chandra Mahal. Marvel at Maharaja Sawai Jai Singh’s stone instruments at Jantar Mantar.',
        evening: 'Photograph Hawa Mahal illuminated at dusk from a rooftop terrace while enjoying authentic kulhad chai and pyaaz kachori.'
      },
      {
        day: 2,
        title: 'Amer Fort, Sheesh Mahal & Nahargarh Sunset',
        morning: 'Morning excursion to majestic Amer Fort atop Cheel ka Teela. Marvel at the kaleidoscopic Sheesh Mahal (Hall of Mirrors).',
        afternoon: 'Stop by Jal Mahal (Water Palace) in Man Sagar Lake. Explore ancient stepwell Panna Meena Kund and artisan workshops.',
        evening: 'Drive up Nahargarh Fort ramparts for panoramic sunset views over the entire illuminated Pink City skyline.'
      },
      {
        day: 3,
        title: 'Bazaars, Block Printing & Rajasthani Feast',
        morning: 'Heritage walking tour through Johari Bazaar and Bapu Bazaar. Shop for gemstones, blue pottery, and bandhani textiles.',
        afternoon: 'Hands-on block-printing masterclass with generational artisans in Sanganer village.',
        evening: 'Royal Rajasthani Thali dinner featuring Dal Baati Churma, Gatte ki Sabzi, Ker Sangri, and sweet Ghewar.'
      },
      {
        day: 4,
        title: 'Scenic Road Trip to Udaipur & Chittorgarh Stop',
        morning: 'Morning journey to Udaipur (City of Lakes). Stop en route at historic Chittorgarh Fort, India’s largest citadel complex.',
        afternoon: 'Arrive in Udaipur. Check into romantic lakeside haveli with carved jharokhas overlooking Lake Pichola.',
        evening: 'Dharohar folk dance and puppet cultural performance at Bagore Ki Haveli on Gangaur Ghat.'
      },
      {
        day: 5,
        title: 'Udaipur City Palace & Lake Pichola Island Cruise',
        morning: 'Tour the grand Udaipur City Palace, exploring the Peacock Courtyard (Mor Chowk) and royal miniature painting galleries.',
        afternoon: 'Private boat cruise on Lake Pichola past Jag Niwas (Lake Palace) and Jag Mandir island palace.',
        evening: 'Romantic dinner on a lakeside marble terrace with live sitar melodies reflecting across shimmering waters.'
      },
      {
        day: 6,
        title: 'Saheliyon Ki Bari & Monsoon Palace Vista',
        morning: 'Visit the peaceful fountain gardens of Saheliyon Ki Bari (Garden of the Maids) and Fateh Sagar Lake.',
        afternoon: 'Artisan shopping for Pichwai paintings, camel leather journals, and silver jewelry in Hathipole.',
        evening: 'Ascend Sajjangarh (Monsoon Palace) perched high in the Aravalli hills for a panoramic desert sunset view.'
      },
      {
        day: 7,
        title: 'Royal Souvenirs & Homeward Departure',
        morning: 'Rooftop breakfast with lakeside views. Pick up traditional Rajasthani miniature artworks and spices.',
        afternoon: 'Private transfer to Udaipur Maharana Pratap Airport (UDR) for onward flight.',
        evening: 'Homeward voyage carrying memories of regal Rajput splendour.'
      }
    ],
    'Ladakh & Pangong Tso': [
      {
        day: 1,
        title: 'Leh Arrival (11,500 ft) & Mandatory Acclimatization',
        morning: 'Arrive at Kushok Bakula Rimpochee Airport (Leh). Immediate transfer to hotel. Rest completely to adjust to thin mountain air.',
        afternoon: 'Strict rest, drink 3-4 liters of water, herbal ginger lemon honey tea, or garlic soup. Avoid strenuous walking.',
        evening: 'Gentle slow stroll around Leh Main Bazaar in late evening. Early night sleep to ensure high-altitude acclimatization.'
      },
      {
        day: 2,
        title: 'Shanti Stupa Sunrise & Leh Palace Stroll',
        morning: 'Gentle morning visit to white-domed Shanti Stupa for 360-degree views of the snow-capped Stok Kangri mountain range.',
        afternoon: 'Explore 17th-century Leh Palace and Hall of Fame museum honoring Himalayan defenders.',
        evening: 'Visit local Tibetan handicraft markets and enjoy steaming hot Ladakhi momos and thukpa noodle soup.'
      },
      {
        day: 3,
        title: 'Thiksey Monastery Sunrise Prayers & Hemis Gompa',
        morning: 'Early morning drive to 12-story Thiksey Monastery. Witness monks playing long brass dungchen horns and morning chanting.',
        afternoon: 'Visit Hemis Monastery, the wealthiest gompa in Ladakh, nestled in a hidden gorge, and Shey Palace.',
        evening: 'Scenic stop at the confluence (Sangam) of Indus and Zanskar rivers; experience Magnetic Hill gravity illusion.'
      },
      {
        day: 4,
        title: 'Khardung La Pass (17,982 ft) & Nubra Valley Descent',
        morning: 'Drive across Khardung La, one of the world’s highest motorable mountain passes with jaw-dropping glacial panoramas.',
        afternoon: 'Descend into surreal Nubra Valley (Valley of Flowers). Check into deluxe tented camp near Diskit.',
        evening: 'Visit colossal 106-foot golden Maitreya Buddha statue at Diskit Monastery overlooking the valley.'
      },
      {
        day: 5,
        title: 'Hunder Sand Dunes & Double-Humped Bactrian Camels',
        morning: 'Ride unique double-humped Bactrian camels across white cold-desert sand dunes in Hunder.',
        afternoon: 'Scenic drive along the Shyok River toward Pangong Tso, navigating dramatic rugged mountain gorges.',
        evening: 'Arrive at Pangong Tso (14,270 ft). Check into lakeside cottage. Watch the sunset turn the lake waters deep indigo.'
      },
      {
        day: 6,
        title: 'Pangong Tso Sunrise Magic & Chang La Return',
        morning: 'Wake up for magical sunrise over Pangong Tso as water shifts from pale emerald to deep sapphire blue.',
        afternoon: 'Scenic mountain drive back to Leh via Chang La Pass (17,590 ft), stopping to spot Himalayan marmots.',
        evening: 'Celebratory farewell dinner in Leh with local Ladakhi apricot dessert and butter tea.'
      },
      {
        day: 7,
        title: 'Apricot Souvenirs & Departure from Leh',
        morning: 'Morning souvenir shopping: organic dried Ladakhi apricots, pashmina shawls, and Tibetan prayer flags.',
        afternoon: 'Transfer to Leh Airport with stunning aerial views of snow-crested Himalayan peaks on takeoff.',
        evening: 'Return flight home with memories of the roof of the world.'
      }
    ],
    'Goa (Shores & Heritage)': [
      {
        day: 1,
        title: 'Arrival in Panaji & Fontainhas Latin Quarter',
        morning: 'Arrive at Goa Airport (GOI/GOX). Private transfer to charming boutique heritage hotel in Panaji.',
        afternoon: 'Walking photography tour through Fontainhas, Asia’s only Latin Quarter, with vibrant yellow and blue Portuguese villas.',
        evening: 'Mandovi River sunset cruise with Goan folk music, followed by authentic Fish Curry Thali and Kokum soda.'
      },
      {
        day: 2,
        title: 'Old Goa UNESCO Cathedrals & Spice Plantation',
        morning: 'Visit the 16th-century Basilica of Bom Jesus (relics of St. Francis Xavier) and majestic Sé Cathedral.',
        afternoon: 'Guided spice plantation tour in Ponda: sample cardamom, vanilla, and peri-peri chilies followed by traditional buffet on banana leaves.',
        evening: 'Relax at Miramar Beach watching fishermen reel in evening catches.'
      },
      {
        day: 3,
        title: 'South Goa Palolem Crescent & Dolphin Cruise',
        morning: 'Drive south to pristine crescent-shaped Palolem Beach, bordered by towering coconut groves.',
        afternoon: 'Hire a local wooden motorboat for dolphin spotting in the bay and visits to Honeymoon Island.',
        evening: 'Beachfront candlelit shack dining with feet in the sand; taste garlic butter crab and grilled kingfish.'
      },
      {
        day: 4,
        title: 'Secluded Butterfly Beach & Sea Kayaking',
        morning: 'Early morning sea kayaking adventure along secluded rocky coves to hidden Butterfly Beach.',
        afternoon: 'Lounge in shade hammocks at Agonda Beach, one of India’s cleanest and quietest coastal stretches.',
        evening: 'Sunset yoga session on the sands, followed by wood-fired pizzas and fresh feni cocktails.'
      },
      {
        day: 5,
        title: 'Cabo de Rama Fort & Coastal Cliffs',
        morning: 'Visit ancient clifftop ruins of Cabo de Rama Fort with sweeping uninterrupted views over the Arabian Sea.',
        afternoon: 'Lunch at cliffside cafes in Canacona. Visit the quiet river-meets-ocean estuary of Talpona.',
        evening: 'Twilight stroll along Colva Beach enjoying street-side Goan choriz pao (spicy sausage bread).'
      },
      {
        day: 6,
        title: 'Dudhsagar Waterfalls & Bhagwan Mahaveer Sanctuary',
        morning: 'Early jeep safari through lush Western Ghats forest tracks to four-tiered milky Dudhsagar Waterfalls.',
        afternoon: 'Swim in cool natural freshwater pool under the iconic railway bridge arch.',
        evening: 'Return to coastal Goa. Relaxing herbal foot reflexology massage and celebratory seafood banquet.'
      },
      {
        day: 7,
        title: 'Souvenir Pickups & Departure',
        morning: 'Pick up local feni, cashew nuts (kaju), bebinca dessert, and Goan spice masalas.',
        afternoon: 'Comfortable transfer to Goa Airport for onward voyage.',
        evening: 'Homeward flight carrying sunshine and coastal susegad tranquility.'
      }
    ],
    'Varanasi (Kashi)': [
      {
        day: 1,
        title: 'Kashi Arrival & Twilight Ganga Aarti at Dashashwamedh',
        morning: 'Arrive at Lal Bahadur Shastri Airport (VNS). Private transfer to riverside heritage hotel near the Ghats.',
        afternoon: 'First orientation walk through ancient stone galis. Taste legendary Banarasi blue lassi and malaiyyo (froth sweet).',
        evening: 'Board a traditional wooden rowboat at Dashashwamedh Ghat for the grand evening Ganga Aarti ceremony with multi-tiered brass oil lamps.'
      },
      {
        day: 2,
        title: 'Sunrise Rowboat Cruise & Sacred Manikarnika Ghat',
        morning: '5:30 AM sunrise boat cruise across the misty holy River Ganga from Assi Ghat to Manikarnika Ghat as temple bells toll.',
        afternoon: 'Walk the historic ghats: Harishchandra Ghat, Chet Singh Fort, and Scindia Ghat’s submerged Shiva temple.',
        evening: 'Visit Assi Ghat for Subah-e-Banaras morning yoga and evening classical Hindustani shehnai and flute performances.'
      },
      {
        day: 3,
        title: 'Kashi Vishwanath Corridor & Banarasi Silk Weavers',
        morning: 'Early morning darshan at the magnificent newly developed Kashi Vishwanath Golden Temple Corridor.',
        afternoon: 'Guided visit to generational master silk-weaver workshops in Madanpura. Observe handloom Banarasi saree weaving.',
        evening: 'Street food expedition: hot crispy kachori sabzi, tamatar chaat at Kashi Chaat Bhandar, and authentic Banarasi paan.'
      },
      {
        day: 4,
        title: 'Sarnath Buddhist Sanctuary & Dhamek Stupa',
        morning: 'Excursion to Sarnath, where Lord Buddha gave his first sermon. Tour towering Dhamek Stupa and peaceful deer park.',
        afternoon: 'Inspect the 3rd-century BCE Ashoka Lion Capital (India’s national emblem) in Sarnath Archaeological Museum.',
        evening: 'Visit Tibetan, Thai, and Japanese Buddhist monasteries in Sarnath with peaceful prayer gardens.'
      },
      {
        day: 5,
        title: 'Banaras Hindu University & Bharat Kala Bhavan Art',
        morning: 'Visit spacious green campus of Banaras Hindu University (BHU) and the New Vishwanath Temple (Birla Temple).',
        afternoon: 'Explore Bharat Kala Bhavan Museum holding priceless Mughal miniatures, ancient sculptures, and stone relics.',
        evening: 'Evening classical sitar music recital at a heritage ghat-side courtyard.'
      },
      {
        day: 6,
        title: 'Ramnagar Fort Across the Ganga & Chunar Stone Carvers',
        morning: 'Cross the pontoon/Malviya Bridge to explore 18th-century Ramnagar Fort, residence of the Kashi Naresh.',
        afternoon: 'Visit the vintage car, ivory palanquin, and armory museum inside the fort walls.',
        evening: 'Farewell boat ride along illuminated ghats reflecting thousands of floating clay diya candles on the water.'
      },
      {
        day: 7,
        title: 'Holy Souvenirs & Homeward Departure',
        morning: 'Final morning chanting at Assi Ghat. Shop for pure Banarasi silk scarves, wooden toys, and brass temple bells.',
        afternoon: 'Private transfer to Varanasi Airport (VNS) for onward journey.',
        evening: 'Flight home carrying the timeless spiritual grace of Kashi.'
      }
    ]
  };

  const activeDays = (itinerariesByDestination[selectedDestination] || itinerariesByDestination['Kerala Backwaters & Munnar']).slice(0, durationDays);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-card itinerary-planner-container" style={{ padding: '2.5rem 2rem' }}>
      {/* ======================================================================
          PRINT-ONLY OFFICIAL TRAVEL DOSSIER HEADER
          ====================================================================== */}
      <div className="print-only itinerary-print-dossier-header">
        <div className="print-brand-row">
          <div className="print-brand-left">
            <div className="print-brand-logo">
              <span className="print-logo-mark">TL</span>
              <span className="print-logo-text">Terra<span style={{ color: '#d97706' }}>Luxe</span></span>
            </div>
            <div className="print-brand-tagline">Curated Indian Tourism &amp; Experiential Travel Journal</div>
          </div>
          <div className="print-brand-right">
            <div className="print-dossier-badge">CONFIRMED EXPEDITION DOSSIER</div>
            <div className="print-dossier-ref">Ref: TLX-IN-{selectedDestination.slice(0, 3).toUpperCase()}-{durationDays}D</div>
            <div className="print-dossier-date">Issued: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
        </div>

        <div className="print-specs-card">
          <div className="print-spec-item">
            <span className="print-spec-label">TARGET DESTINATION</span>
            <span className="print-spec-value">{selectedDestination}</span>
          </div>
          <div className="print-spec-item">
            <span className="print-spec-label">PLANNED DURATION</span>
            <span className="print-spec-value">{durationDays} Days / {durationDays - 1} Nights</span>
          </div>
          <div className="print-spec-item">
            <span className="print-spec-label">COMFORT TIER</span>
            <span className="print-spec-value">{travelStyle}</span>
          </div>
          <div className="print-spec-item">
            <span className="print-spec-label">EST. INVESTMENT (INR)</span>
            <span className="print-spec-value print-price-highlight">
              ₹{totalCost.toLocaleString('en-IN')}{' '}
              <span className="print-daily-sub">(~₹{dailyRate.toLocaleString('en-IN')} / day)</span>
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================================
          SCREEN-ONLY INTERACTIVE CONFIGURATION CONTROLS
          ====================================================================== */}
      <div className="no-print" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={13} /> Interactive Custom Trip Builder
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Design Your Ideal Itinerary
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
          Calculate realistic daily expenditure, coordinate day-by-day sightseeing highlights, and tailor your journey to your personal pace.
        </p>
      </div>

      {/* Configuration Controls Bar (Hidden in Print) */}
      <div
        className="no-print"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2.5rem',
        }}
      >
        {/* Destination Picker */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
            Target Destination
          </label>
          <select
            value={selectedDestination}
            onChange={e => setSelectedDestination(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(7, 15, 30, 0.9)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.92rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {Object.keys(destinationRates).map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        {/* Duration Days */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
            Trip Duration
          </label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[3, 5, 7].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setDurationDays(d)}
                style={{
                  flex: 1,
                  padding: '0.75rem 0',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: durationDays === d ? 'var(--accent-gold)' : 'var(--border-subtle)',
                  background: durationDays === d ? 'var(--accent-gold)' : 'rgba(7, 15, 30, 0.6)',
                  color: durationDays === d ? '#070F1E' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style */}
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
            Travel Style &amp; Pacing
          </label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['Budget', 'Comfort', 'Luxury'].map(style => (
              <button
                key={style}
                type="button"
                onClick={() => setTravelStyle(style)}
                style={{
                  flex: 1,
                  padding: '0.75rem 0',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: travelStyle === style ? '#2A9D8F' : 'var(--border-subtle)',
                  background: travelStyle === style ? '#2A9D8F' : 'rgba(7, 15, 30, 0.6)',
                  color: travelStyle === style ? '#FFFFFF' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Estimator Summary Banner (Hidden in Print, replaced by Dossier Specs) */}
      <div
        className="no-print"
        style={{
          background: 'linear-gradient(135deg, rgba(241, 158, 56, 0.12) 0%, rgba(224, 122, 95, 0.12) 100%)',
          border: '1px solid rgba(241, 158, 56, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
            Estimated Investment for {durationDays} Days in {selectedDestination} ({travelStyle} Tier)
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            ₹{totalCost.toLocaleString('en-IN')}{' '}
            <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              (~₹{dailyRate.toLocaleString('en-IN')} / day per person)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => {
              const textSummary = `TerraLuxe Travel Itinerary:\nDestination: ${selectedDestination}\nDuration: ${durationDays} Days (${travelStyle})\nTotal Budget: ₹${totalCost.toLocaleString('en-IN')} (~₹${dailyRate.toLocaleString('en-IN')}/day)`;
              navigator.clipboard?.writeText(textSummary);
              showToast('Itinerary details copied to your clipboard!');
            }}
            className="btn-secondary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
          >
            <Share2 size={16} /> Share Plan
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
          >
            <Printer size={16} /> Save &amp; Print
          </button>
        </div>
      </div>

      {/* ======================================================================
          CURATED STEP-BY-STEP SCHEDULE TIMELINE
          ====================================================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            Curated {durationDays}-Day Step-by-Step Schedule
          </h3>
          <span className="badge badge-emerald no-print" style={{ fontSize: '0.75rem' }}>
            <ShieldCheck size={13} /> Tailored to {selectedDestination}
          </span>
        </div>

        {activeDays.map(item => (
          <div
            key={item.day}
            className="itinerary-day-card"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div className="itinerary-day-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  className="itinerary-day-badge"
                  style={{
                    background: 'var(--accent-gold)',
                    color: '#070F1E',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  DAY {item.day}
                </div>
                <h4 className="itinerary-day-title" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {item.title}
                </h4>
              </div>
            </div>

            <div className="itinerary-time-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="itinerary-time-block" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div className="itinerary-time-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                  🌅 Morning
                </div>
                <div className="itinerary-time-text" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {item.morning}
                </div>
              </div>

              <div className="itinerary-time-block" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div className="itinerary-time-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3CD0BF', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                  ☀️ Afternoon
                </div>
                <div className="itinerary-time-text" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {item.afternoon}
                </div>
              </div>

              <div className="itinerary-time-block" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div className="itinerary-time-label" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-coral)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                  🌙 Evening
                </div>
                <div className="itinerary-time-text" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {item.evening}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======================================================================
          PRINT-ONLY OFFICIAL TRAVEL DOSSIER FOOTER
          ====================================================================== */}
      <div className="print-only itinerary-print-dossier-footer">
        <div>
          <strong>TerraLuxe Expedition Journal</strong> • Tailored Indian Travel Dossier • All Estimates in INR (₹)
        </div>
        <div>
          Official Verified Itinerary • Page Document
        </div>
      </div>
    </div>
  );
};
