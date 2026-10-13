export const INITIAL_DESTINATIONS = [
  {
    id: 1,
    name: 'Kerala Backwaters & Munnar',
    country: 'India',
    continent: 'South India',
    tagline: "God's Own Country: Emerald Backwaters & Mist-Veiled Tea Plantations",
    description: 'Fringed by swaying coconut palms and tranquil emerald lagoons, Kerala offers the ultimate holistic retreat. Drift along the palm-shaded backwaters of Alleppey aboard a traditional kettuvallam houseboat, explore the misty high-altitude tea estates of Munnar, and indulge in authentic centuries-old Ayurvedic rejuvenation.',
    heroImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    bestSeason: 'Sept - March (Pleasant) & June - Aug (Ayurvedic Monsoon)',
    currency: 'INR (₹ Indian Rupee)',
    language: 'Malayalam, English, Hindi',
    budgetLevel: 'Moderate',
    travelVibe: 'Relaxation',
    averageDailyCost: 2800,
    rating: 4.94,
    reviewsCount: 42,
    featured: true,
    attractions: [
      {
        id: 101,
        name: 'Alleppey Houseboat Backwater Cruise',
        category: 'Nature',
        description: 'Cruise serene palm-canopied canals and paddy fields aboard a traditional handcrafted wooden kettuvallam.',
        imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
        entryFee: '₹3,500 - ₹7,000 / day private cruise',
        openingHours: 'Daylight hours',
        recommendedDuration: 'Full Day / Overnight',
        insiderTip: 'Book licensed DTPC green-certified houseboats for organic Karimeen fish lunches and peaceful backwater anchoring.'
      },
      {
        id: 102,
        name: 'Munnar Tea Gardens & Eravikulam',
        category: 'Nature',
        description: 'Rolling carpets of emerald tea plantations home to the endangered Nilgiri Tahr and pristine mountain lookouts.',
        imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        entryFee: '₹200 (Indians) / ₹500 (Foreigners)',
        openingHours: '7:30 AM - 4:00 PM',
        recommendedDuration: '3 - 4 Hours',
        insiderTip: 'Visit Top Station at dawn when mountain mists part across the Western Ghats crest.'
      },
      {
        id: 103,
        name: 'Fort Kochi Heritage & Chinese Fishing Nets',
        category: 'Cultural',
        description: 'Colonial spice warehouses, Portuguese churches, and cantilevered Chinese fishing nets silhouetted against the Arabian Sea.',
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        entryFee: 'Free',
        openingHours: 'Open 24 hours',
        recommendedDuration: '2 - 3 Hours',
        insiderTip: 'Walk Jew Town in Mattancherry for antique spices and Kathakali cultural performances.'
      }
    ],
    reviews: [
      {
        id: 201,
        authorName: 'Ananya Sharma',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        content: 'Alleppey backwaters in a traditional kettuvallam was peaceful beyond words. The fresh karimeen pollichathu cooked on board by the boat crew was exceptional. Cost was very reasonable in INR!',
        travelerType: 'Couple',
        travelDate: 'January 2026'
      },
      {
        id: 202,
        authorName: 'Rahul Nair',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        content: 'Munnar tea estates at sunrise was the highlight of our Kerala trip. Very easy to pay via UPI everywhere in towns.',
        travelerType: 'Family',
        travelDate: 'December 2025'
      }
    ]
  },
  {
    id: 2,
    name: 'Jaipur & Udaipur',
    country: 'India',
    continent: 'North India',
    tagline: "The Pink City & Lake Palaces: Rajasthan's Royal Grandeur",
    description: "Step into the regal splendour of Rajasthan. Marvel at the honeycomb sandstone lattice of Hawa Mahal, the towering amber ramparts of Amer Fort, and the shimmering white marble courtyards of Udaipur's Lake Pichola palace reflecting under star-lit desert skies.",
    heroImageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
    bestSeason: 'October - March (Cool Desert Season)',
    currency: 'INR (₹ Indian Rupee)',
    language: 'Hindi, Rajasthani, English',
    budgetLevel: 'Luxury',
    travelVibe: 'Cultural',
    averageDailyCost: 3800,
    rating: 4.96,
    reviewsCount: 58,
    featured: true,
    attractions: [
      {
        id: 104,
        name: 'Amer Fort & Sheesh Mahal',
        category: 'Historical',
        description: 'Hilltop 16th-century fortress renowned for its dazzling Hall of Mirrors and panoramic views over Maota Lake.',
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        entryFee: '₹100 (Indians) / ₹550 (Foreigners)',
        openingHours: '8:00 AM - 5:30 PM',
        recommendedDuration: '3 Hours',
        insiderTip: 'Visit during the late afternoon light and stay for the enchanting sound and light show.'
      },
      {
        id: 105,
        name: 'Hawa Mahal (Palace of Winds)',
        category: 'Landmark',
        description: 'Five-story pink and red sandstone facade with 953 intricately carved jharokhas built for royal women to observe street festivities.',
        imageUrl: 'https://images.unsplash.com/photo-1603204077364-7f1545610815?auto=format&fit=crop&w=800&q=80',
        entryFee: '₹50 (Indians) / ₹200 (Foreigners)',
        openingHours: '9:00 AM - 5:00 PM',
        recommendedDuration: '1 - 1.5 Hours',
        insiderTip: 'Best viewed and photographed from rooftop cafes across the street in early morning sunlight.'
      },
      {
        id: 106,
        name: 'Udaipur City Palace & Lake Pichola',
        category: 'Historical',
        description: "Rajasthan's largest royal palace complex overlooking Lake Pichola with mirrored courtyards and antique royal collections.",
        imageUrl: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
        entryFee: '₹300 Entry + ₹400 Lake Boat Cruise',
        openingHours: '9:00 AM - 5:30 PM',
        recommendedDuration: '3 - 4 Hours',
        insiderTip: 'Take the sunset boat cruise around Jag Mandir island palace for breathtaking golden hour reflections.'
      }
    ],
    reviews: [
      {
        id: 203,
        authorName: 'Priya Kulkarni',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        content: 'Amer Fort and the City Palace boat cruise on Lake Pichola in Udaipur felt like living in a fairytale. Staying in a heritage haveli was worth every rupee.',
        travelerType: 'Couple',
        travelDate: 'February 2026'
      }
    ]
  },
  {
    id: 3,
    name: 'Ladakh & Pangong Tso',
    country: 'India',
    continent: 'Himalayas',
    tagline: 'Land of High Passes: Cobalt Lakes & Buddhist Monasteries',
    description: "A surreal high-altitude mountain sanctuary nestled between the Karakoram and Himalayan ranges. Traverse the world's highest motorable passes, discover cliffside Buddhist gompas chanting ancient mantras, and gaze upon the hypnotic cobalt blue waters of Pangong Tso.",
    heroImageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80',
    bestSeason: 'May - September (Roads Open & Clear Skies)',
    currency: 'INR (₹ Indian Rupee)',
    language: 'Ladakhi, Hindi, English',
    budgetLevel: 'Moderate',
    travelVibe: 'Alpine',
    averageDailyCost: 3200,
    rating: 4.98,
    reviewsCount: 37,
    featured: true,
    attractions: [
      {
        id: 107,
        name: 'Pangong Tso & Nubra Valley',
        category: 'Nature',
        description: "World's highest saltwater lake shifting colors from azure to indigo, surrounded by arid Himalayan peaks.",
        imageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
        entryFee: 'Inner Line Permit (₹450 / person)',
        openingHours: 'Daylight hours',
        recommendedDuration: 'Full Day / Overnight',
        insiderTip: 'Allow 48 hours acclimatization in Leh before traveling to Pangong (14,270 ft) or Khardung La.'
      },
      {
        id: 108,
        name: 'Thiksey Monastery',
        category: 'Cultural',
        description: "Twelve-story monastery resembling Lhasa's Potala Palace with a 49-foot Maitreya Buddha statue and sunrise morning prayers.",
        imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
        entryFee: '₹50 Entry',
        openingHours: '7:00 AM - 6:00 PM',
        recommendedDuration: '2 Hours',
        insiderTip: 'Arrive by 6:30 AM to witness the monastic trumpets and morning chanting meditation ceremony.'
      }
    ],
    reviews: [
      {
        id: 204,
        authorName: 'Vikram Sen',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        content: 'Pangong Lake color transition is surreal! Acclimatize in Leh for 2 full days before heading over Chang La. An unforgettable Himalayan journey.',
        travelerType: 'Solo',
        travelDate: 'July 2026'
      }
    ]
  },
  {
    id: 4,
    name: 'Goa (Shores & Heritage)',
    country: 'India',
    continent: 'West India',
    tagline: 'Golden Sands, Portuguese Baroque & Coastal Susegad',
    description: "From the UNESCO-listed 16th-century cathedrals of Velha Goa to tranquil palm-fringed sands of Palolem and Agonda, Goa is India's coastal jewel. Savor spicy prawn balchão, explore riverside spice plantations, and experience the relaxed philosophy of coastal susegad.",
    heroImageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    bestSeason: 'November - February (Gentle Sea Breezes)',
    currency: 'INR (₹ Indian Rupee)',
    language: 'Konkani, English, Hindi',
    budgetLevel: 'Budget',
    travelVibe: 'Coastal',
    averageDailyCost: 2200,
    rating: 4.88,
    reviewsCount: 49,
    featured: false,
    attractions: [
      {
        id: 109,
        name: 'Basilica of Bom Jesus (Old Goa)',
        category: 'Historical',
        description: 'Baroque UNESCO World Heritage basilica holding the sacred relics of St. Francis Xavier, constructed in 1605.',
        imageUrl: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&w=800&q=80',
        entryFee: 'Free',
        openingHours: '9:00 AM - 6:30 PM',
        recommendedDuration: '1.5 Hours',
        insiderTip: 'Visit alongside Sé Cathedral across the square, the largest church in Asia.'
      },
      {
        id: 110,
        name: 'Palolem & Butterfly Beach',
        category: 'Nature',
        description: 'Crescent-shaped bay shaded by coconut groves offering dolphin boat tours and serene beachside shacks.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        entryFee: 'Free',
        openingHours: 'Open 24 hours',
        recommendedDuration: 'Half Day',
        insiderTip: 'Rent a sea kayak in the early morning to explore secluded Butterfly Beach.'
      }
    ],
    reviews: []
  },
  {
    id: 5,
    name: 'Varanasi (Kashi)',
    country: 'India',
    continent: 'North India',
    tagline: 'The Eternal City: Sacred Ganga Ghats & Timeless Rituals',
    description: "Among the world's oldest continuously inhabited cities, Varanasi is the spiritual heartbeat of India. Witness the hypnotic evening Ganga Aarti ceremony at Dashashwamedh Ghat, take a sunrise boat across sacred waters, and explore winding galis redolent of sandalwood and Banarasi silk.",
    heroImageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    bestSeason: 'October - March (Comfortable Mornings)',
    currency: 'INR (₹ Indian Rupee)',
    language: 'Hindi, Bhojpuri, English',
    budgetLevel: 'Budget',
    travelVibe: 'Cultural',
    averageDailyCost: 1600,
    rating: 4.93,
    reviewsCount: 53,
    featured: false,
    attractions: [
      {
        id: 111,
        name: 'Dashashwamedh Ghat & Evening Ganga Aarti',
        category: 'Landmark',
        description: 'Hypnotic ritual with multi-tiered brass lamps, conch shells, and devotional chanting along the holy River Ganga.',
        imageUrl: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
        entryFee: 'Free (₹300 - ₹500 for boat vantage)',
        openingHours: '6:45 PM Daily',
        recommendedDuration: '2 Hours',
        insiderTip: 'Arrive at 5:30 PM by wooden rowboat to secure a front-row view from the water as dusk descends.'
      },
      {
        id: 112,
        name: 'Sarnath Deer Park & Dhamek Stupa',
        category: 'Historical',
        description: 'Sacred Buddhist site where Gautama Buddha delivered his first sermon after enlightenment.',
        imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
        entryFee: '₹25 (Indians) / ₹300 (Foreigners)',
        openingHours: '6:00 AM - 5:00 PM',
        recommendedDuration: '2 - 3 Hours',
        insiderTip: 'Visit the Sarnath Archaeological Museum to see the original Ashoka Lion Capital (India’s national emblem).'
      }
    ],
    reviews: []
  }
];

export const INITIAL_BLOG_POSTS = [
  {
    id: 1,
    title: 'The Ultimate 6-Day Kerala Circuit: Backwaters, Tea Highlands & Ayurvedic Living',
    slug: 'ultimate-kerala-backwaters-munnar-circuit',
    excerpt: "Discover God's Own Country with our day-by-day curated route through Alleppey lagoons, misty Munnar tea hills, and spice markets.",
    content: `Kerala invites slow, mindful travel. From the gentle rhythm of water lapping against your wooden houseboat in Kumarakom to the crisp mountain breeze of Munnar, every mile rejuvenates the senses.

### Day 1 & 2: Alleppey & Kumarakom Lagoons
Board your private kettuvallam at Punnamada Jetty by noon. Glide through narrow palm-canopied waterways where kingfishers dart between water lilies. Enjoy freshly caught pearl spot (Karimeen) spiced with fragrant curry leaves.

### Day 3 & 4: Munnar's Misty Highlands
Ascend the Western Ghats through Cheeyappara waterfalls to reach Munnar at 1,600m elevation. Walk through organic tea plantations and visit the Tata Tea Museum.

### Practical Budgeting (INR)
Expect average daily expenses between ₹2,500 and ₹4,000 per person including authentic homestays, private transport, and local dining.`,
    authorName: 'Aarav Mehta',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 7,
    category: 'Itineraries',
    tags: 'Kerala, Backwaters, Munnar, South India',
    featured: true,
    publishedAt: '2026-06-10',
    destinationId: 1
  },
  {
    id: 2,
    title: 'Palaces, Forts & Desert Dusk: A Royal 5-Day Expedition Across Jaipur & Udaipur',
    slug: 'royal-rajasthan-jaipur-udaipur-expedition',
    excerpt: 'Experience the grandeur of Rajput dynasties, artisan block printing, sunset boat rides on Lake Pichola, and royal dining halls.',
    content: `Rajasthan is poetry written in sandstone and marble. Jaipur dazzles with its royal observatories and vibrant bazaars, while Udaipur enchants with romantic lake palaces.

### Must-Do Experiences
- Sunrise view of Hawa Mahal with kulhad chai from the opposite rooftop terrace.
- Sunset boat cruise across Lake Pichola passing Jag Mandir.
- Sampling authentic Dal Baati Churma and Ghewar at generational sweetmakers.

### Money & Practical Advice
Entry tickets for major forts are ₹50 - ₹100 for Indian citizens and ₹300 - ₹550 for foreign visitors. UPI payments are accepted at virtually all monument ticket counters.`,
    authorName: 'Meera Rathore',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 9,
    category: 'Heritage Guides',
    tags: 'Rajasthan, Jaipur, Udaipur, Royal India',
    featured: true,
    publishedAt: '2026-07-02',
    destinationId: 2
  },
  {
    id: 3,
    title: 'High Passes & Tibetan Gompas: The High-Altitude Explorer Guide to Ladakh',
    slug: 'ladakh-high-passes-pangong-explorer-guide',
    excerpt: 'Essential tips for crossing Khardung La, acclimatizing in Leh, obtaining Inner Line Permits, and camping under dark Himalayan skies.',
    content: `Nestled in the rain shadow of the mighty Himalayas, Ladakh feels like another planet. The high-altitude desert demands respect and careful preparation.

### Acclimatization is Paramount
Do not rush. Spend your first 48 hours in Leh (11,500 ft) drinking plenty of water, visiting local monasteries, and avoiding strenuous climbing.

### Inner Line Permits (ILP)
Apply online for your protected area permit (₹450 per person) to visit Pangong Tso, Nubra Valley, and Tso Moriri. Carry printouts for the military checkpoints at South Pullu and North Pullu.`,
    authorName: 'Kabir Joshi',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    readTimeMinutes: 8,
    category: 'Adventure Guides',
    tags: 'Ladakh, Himalayas, Pangong, Trekking',
    featured: true,
    publishedAt: '2026-08-15',
    destinationId: 3
  }
];
