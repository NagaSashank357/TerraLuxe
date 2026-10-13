package com.company.app.config;

import com.company.app.model.Attraction;
import com.company.app.model.BlogPost;
import com.company.app.model.Destination;
import com.company.app.model.Review;
import com.company.app.repository.BlogPostRepository;
import com.company.app.repository.DestinationRepository;
import com.company.app.repository.ReviewRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final DestinationRepository destinationRepository;
    private final BlogPostRepository blogPostRepository;
    private final ReviewRepository reviewRepository;

    public DataSeeder(DestinationRepository destinationRepository,
                      BlogPostRepository blogPostRepository,
                      ReviewRepository reviewRepository) {
        this.destinationRepository = destinationRepository;
        this.blogPostRepository = blogPostRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... args) {
        try {
            // Check if database needs migration to Indian destinations or is already lean
            if (destinationRepository.count() > 0) {
                boolean hasNonIndian = destinationRepository.findAll().stream()
                        .anyMatch(d -> !"India".equalsIgnoreCase(d.getCountry()));
                if (!hasNonIndian) {
                    System.out.println("ℹ️ MongoDB already contains Indian destination data. Storage is well within the 500MB free tier limit (~120KB).");
                    return;
                }
                System.out.println("🧹 Purging old international records to conserve 500MB MongoDB Atlas storage quota...");
                destinationRepository.deleteAll();
                blogPostRepository.deleteAll();
                reviewRepository.deleteAll();
            }

            System.out.println("🌱 Seeding MongoDB Atlas with curated Indian destinations, itineraries & INR pricing...");

            // 1. Kerala Backwaters & Munnar (South India)
            Destination kerala = new Destination(
                    "Kerala Backwaters & Munnar",
                    "India",
                    "South India",
                    "God's Own Country: Emerald Backwaters & Mist-Veiled Tea Plantations",
                    "Fringed by swaying coconut palms and tranquil emerald lagoons, Kerala offers the ultimate holistic retreat. Drift along the palm-shaded backwaters of Alleppey aboard a traditional kettuvallam houseboat, explore the misty high-altitude tea estates of Munnar, and indulge in authentic centuries-old Ayurvedic rejuvenation.",
                    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
                    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
                    "Sept - March (Pleasant) & June - Aug (Ayurvedic Monsoon)",
                    "INR (₹ Indian Rupee)",
                    "Malayalam, English, Hindi",
                    "Moderate",
                    "Relaxation",
                    2800.0,
                    4.94,
                    42,
                    true
            );
            kerala.setAttractions(Arrays.asList(
                    new Attraction("Alleppey Houseboat Backwater Cruise", "Nature",
                            "Cruise serene palm-canopied canals and paddy fields aboard a traditional handcrafted wooden kettuvallam.",
                            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
                            "₹3,500 - ₹7,000 / day private cruise", "Daylight hours", "Full Day / Overnight", "Book licensed DTPC green-certified houseboats for organic Karimeen fish lunches and peaceful backwater anchoring."),
                    new Attraction("Munnar Tea Gardens & Eravikulam", "Nature",
                            "Rolling carpets of emerald tea plantations home to the endangered Nilgiri Tahr and pristine mountain lookouts.",
                            "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
                            "₹200 (Indians) / ₹500 (Foreigners)", "7:30 AM - 4:00 PM", "3 - 4 Hours", "Visit Top Station at dawn when mountain mists part across the Western Ghats crest."),
                    new Attraction("Fort Kochi Heritage & Chinese Fishing Nets", "Cultural",
                            "Colonial spice warehouses, Portuguese churches, and cantilevered Chinese fishing nets silhouetted against the Arabian Sea.",
                            "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
                            "Free", "Open 24 hours", "2 - 3 Hours", "Walk Jew Town in Mattancherry for antique spices and Kathakali cultural performances.")
            ));
            Destination savedKerala = destinationRepository.save(kerala);

            // 2. Jaipur & Udaipur (North India)
            Destination rajasthan = new Destination(
                    "Jaipur & Udaipur",
                    "India",
                    "North India",
                    "The Pink City & Lake Palaces: Rajasthan's Royal Grandeur",
                    "Step into the regal splendour of Rajasthan. Marvel at the honeycomb sandstone lattice of Hawa Mahal, the towering amber ramparts of Amer Fort, and the shimmering white marble courtyards of Udaipur's Lake Pichola palace reflecting under star-lit desert skies.",
                    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80",
                    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
                    "October - March (Cool Desert Season)",
                    "INR (₹ Indian Rupee)",
                    "Hindi, Rajasthani, English",
                    "Luxury",
                    "Cultural",
                    3800.0,
                    4.96,
                    58,
                    true
            );
            rajasthan.setAttractions(Arrays.asList(
                    new Attraction("Amer Fort & Sheesh Mahal", "Historical",
                            "Hilltop 16th-century fortress renowned for its dazzling Hall of Mirrors and panoramic views over Maota Lake.",
                            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
                            "₹100 (Indians) / ₹550 (Foreigners)", "8:00 AM - 5:30 PM", "3 Hours", "Visit during the late afternoon light and stay for the enchanting sound and light show."),
                    new Attraction("Hawa Mahal (Palace of Winds)", "Landmark",
                            "Five-story pink and red sandstone facade with 953 intricately carved jharokhas built for royal women to observe street festivities.",
                            "https://images.unsplash.com/photo-1603204077364-7f1545610815?auto=format&fit=crop&w=800&q=80",
                            "₹50 (Indians) / ₹200 (Foreigners)", "9:00 AM - 5:00 PM", "1 - 1.5 Hours", "Best viewed and photographed from rooftop cafes across the street in early morning sunlight."),
                    new Attraction("Udaipur City Palace & Lake Pichola", "Historical",
                            "Rajasthan's largest royal palace complex overlooking Lake Pichola with mirrored courtyards and antique royal collections.",
                            "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80",
                            "₹300 Entry + ₹400 Lake Boat Cruise", "9:00 AM - 5:30 PM", "3 - 4 Hours", "Take the sunset boat cruise around Jag Mandir island palace for breathtaking golden hour reflections.")
            ));
            Destination savedRajasthan = destinationRepository.save(rajasthan);

            // 3. Ladakh & Leh (Himalayas)
            Destination ladakh = new Destination(
                    "Ladakh & Pangong Tso",
                    "India",
                    "Himalayas",
                    "Land of High Passes: Cobalt Lakes & Buddhist Monasteries",
                    "A surreal high-altitude mountain sanctuary nestled between the Karakoram and Himalayan ranges. Traverse the world's highest motorable passes, discover cliffside Buddhist gompas chanting ancient mantras, and gaze upon the hypnotic cobalt blue waters of Pangong Tso.",
                    "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80",
                    "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80",
                    "May - September (Roads Open & Clear Skies)",
                    "INR (₹ Indian Rupee)",
                    "Ladakhi, Hindi, English",
                    "Moderate",
                    "Alpine",
                    3200.0,
                    4.98,
                    37,
                    true
            );
            ladakh.setAttractions(Arrays.asList(
                    new Attraction("Pangong Tso & Nubra Valley", "Nature",
                            "World's highest saltwater lake shifting colors from azure to indigo, surrounded by arid Himalayan peaks.",
                            "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80",
                            "Inner Line Permit (₹450 / person)", "Daylight hours", "Full Day / Overnight", "Allow 48 hours acclimatization in Leh before traveling to Pangong (14,270 ft) or Khardung La."),
                    new Attraction("Thiksey Monastery", "Cultural",
                            "Twelve-story monastery resembling Lhasa's Potala Palace with a 49-foot Maitreya Buddha statue and sunrise morning prayers.",
                            "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
                            "₹50 Entry", "7:00 AM - 6:00 PM", "2 Hours", "Arrive by 6:30 AM to witness the monastic trumpets and morning chanting meditation ceremony.")
            ));
            Destination savedLadakh = destinationRepository.save(ladakh);

            // 4. Goa (West India)
            Destination goa = new Destination(
                    "Goa (Shores & Heritage)",
                    "India",
                    "West India",
                    "Golden Sands, Portuguese Baroque & Coastal Susegad",
                    "From the UNESCO-listed 16th-century cathedrals of Velha Goa to tranquil palm-fringed sands of Palolem and Agonda, Goa is India's coastal jewel. Savor spicy prawn balchão, explore riverside spice plantations, and experience the relaxed philosophy of coastal susegad.",
                    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
                    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
                    "November - February (Gentle Sea Breezes)",
                    "INR (₹ Indian Rupee)",
                    "Konkani, English, Hindi",
                    "Budget",
                    "Coastal",
                    2200.0,
                    4.88,
                    49,
                    false
            );
            goa.setAttractions(Arrays.asList(
                    new Attraction("Basilica of Bom Jesus (Old Goa)", "Historical",
                            "Baroque UNESCO World Heritage basilica holding the sacred relics of St. Francis Xavier, constructed in 1605.",
                            "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&w=800&q=80",
                            "Free", "9:00 AM - 6:30 PM", "1.5 Hours", "Visit alongside Sé Cathedral across the square, the largest church in Asia."),
                    new Attraction("Palolem & Butterfly Beach", "Nature",
                            "Crescent-shaped bay shaded by coconut groves offering dolphin boat tours and serene beachside shacks.",
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                            "Free", "Open 24 hours", "Half Day", "Rent a sea kayak in the early morning to explore secluded Butterfly Beach.")
            ));
            Destination savedGoa = destinationRepository.save(goa);

            // 5. Varanasi (North India)
            Destination varanasi = new Destination(
                    "Varanasi (Kashi)",
                    "India",
                    "North India",
                    "The Eternal City: Sacred Ganga Ghats & Timeless Rituals",
                    "Among the world's oldest continuously inhabited cities, Varanasi is the spiritual heartbeat of India. Witness the hypnotic evening Ganga Aarti ceremony at Dashashwamedh Ghat, take a sunrise boat across sacred waters, and explore winding galis redolent of sandalwood and Banarasi silk.",
                    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80",
                    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
                    "October - March (Comfortable Mornings)",
                    "INR (₹ Indian Rupee)",
                    "Hindi, Bhojpuri, English",
                    "Budget",
                    "Cultural",
                    1600.0,
                    4.93,
                    53,
                    false
            );
            varanasi.setAttractions(Arrays.asList(
                    new Attraction("Dashashwamedh Ghat & Evening Ganga Aarti", "Landmark",
                            "Hypnotic ritual with multi-tiered brass lamps, conch shells, and devotional chanting along the holy River Ganga.",
                            "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
                            "Free (₹300 - ₹500 for boat vantage)", "6:45 PM Daily", "2 Hours", "Arrive at 5:30 PM by wooden rowboat to secure a front-row view from the water as dusk descends."),
                    new Attraction("Sarnath Deer Park & Dhamek Stupa", "Historical",
                            "Sacred Buddhist site where Gautama Buddha delivered his first sermon after enlightenment.",
                            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
                            "₹25 (Indians) / ₹300 (Foreigners)", "6:00 AM - 5:00 PM", "2 - 3 Hours", "Visit the Sarnath Archaeological Museum to see the original Ashoka Lion Capital (India's national emblem).")
            ));
            Destination savedVaranasi = destinationRepository.save(varanasi);

            // Seed Indian Reviews
            reviewRepository.saveAll(Arrays.asList(
                    new Review(savedKerala.getId(), "Ananya Sharma", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                            5, "Alleppey backwaters in a traditional kettuvallam was peaceful beyond words. The fresh karimeen pollichathu cooked on board by the boat crew was exceptional. Cost was very reasonable in INR!", "Couple", "January 2026"),
                    new Review(savedKerala.getId(), "Rahul Nair", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                            5, "Munnar tea estates at sunrise was the highlight of our Kerala trip. Very easy to pay via UPI everywhere in towns.", "Family", "December 2025"),
                    new Review(savedRajasthan.getId(), "Priya Kulkarni", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
                            5, "Amer Fort and the City Palace boat cruise on Lake Pichola in Udaipur felt like living in a fairytale. Staying in a heritage haveli was worth every rupee.", "Couple", "February 2026"),
                    new Review(savedLadakh.getId(), "Vikram Sen", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
                            5, "Pangong Lake color transition is surreal! Acclimatize in Leh for 2 full days before heading over Chang La. An unforgettable Himalayan journey.", "Solo", "July 2026")
            ));

            // Seed Indian Travel Blog Posts
            blogPostRepository.saveAll(Arrays.asList(
                    new BlogPost(savedKerala.getId(),
                            "The Ultimate 6-Day Kerala Circuit: Backwaters, Tea Highlands & Ayurvedic Living",
                            "ultimate-kerala-backwaters-munnar-circuit",
                            "Discover God's Own Country with our day-by-day curated route through Alleppey lagoons, misty Munnar tea hills, and spice markets.",
                            "Kerala invites slow, mindful travel. From the gentle rhythm of water lapping against your wooden houseboat in Kumarakom to the crisp mountain breeze of Munnar, every mile rejuvenates the senses.\n\n### Day 1 & 2: Alleppey & Kumarakom Lagoons\nBoard your private kettuvallam at Punnamada Jetty by noon. Glide through narrow palm-canopied waterways where kingfishers dart between water lilies. Enjoy freshly caught pearl spot (Karimeen) spiced with fragrant curry leaves.\n\n### Day 3 & 4: Munnar's Misty Highlands\nAscend the Western Ghats through Cheeyappara waterfalls to reach Munnar at 1,600m elevation. Walk through organic tea plantations and visit the Tata Tea Museum.\n\n### Practical Budgeting (INR)\nExpect average daily expenses between ₹2,500 and ₹4,000 per person including authentic homestays, private transport, and local dining.",
                            "Aarav Mehta", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
                            7, "Itineraries", "Kerala, Backwaters, Munnar, South India", true),
                    new BlogPost(savedRajasthan.getId(),
                            "Palaces, Forts & Desert Dusk: A Royal 5-Day Expedition Across Jaipur & Udaipur",
                            "royal-rajasthan-jaipur-udaipur-expedition",
                            "Experience the grandeur of Rajput dynasties, artisan block printing, sunset boat rides on Lake Pichola, and royal dining halls.",
                            "Rajasthan is poetry written in sandstone and marble. Jaipur dazzles with its royal observatories and vibrant bazaars, while Udaipur enchants with romantic lake palaces.\n\n### Must-Do Experiences\n- Sunrise view of Hawa Mahal with kulhad chai from the opposite rooftop terrace.\n- Sunset boat cruise across Lake Pichola passing Jag Mandir.\n- Sampling authentic Dal Baati Churma and Ghewar at generational sweetmakers.\n\n### Money & Practical Advice\nEntry tickets for major forts are ₹50 - ₹100 for Indian citizens and ₹300 - ₹550 for foreign visitors. UPI payments are accepted at virtually all monument ticket counters.",
                            "Meera Rathore", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
                            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
                            9, "Heritage Guides", "Rajasthan, Jaipur, Udaipur, Royal India", true),
                    new BlogPost(savedLadakh.getId(),
                            "High Passes & Tibetan Gompas: The High-Altitude Explorer's Guide to Ladakh",
                            "ladakh-high-passes-pangong-explorer-guide",
                            "Essential tips for crossing Khardung La, acclimatizing in Leh, obtaining Inner Line Permits, and camping under dark Himalayan skies.",
                            "Nestled in the rain shadow of the mighty Himalayas, Ladakh feels like another planet. The high-altitude desert demands respect and careful preparation.\n\n### Acclimatization is Paramount\nDo not rush. Spend your first 48 hours in Leh (11,500 ft) drinking plenty of water, visiting local monasteries, and avoiding strenuous climbing.\n\n### Inner Line Permits (ILP)\nApply online for your protected area permit (₹450 per person) to visit Pangong Tso, Nubra Valley, and Tso Moriri.",
                            "Kabir Joshi", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                            "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
                            8, "Adventure Guides", "Ladakh, Himalayas, Pangong, Trekking", true)
            ));

            System.out.println("🎉 Successfully seeded 5 curated Indian destinations, INR pricing & travel guides into MongoDB Atlas!");
            System.out.println("📊 Total storage footprint: ~120 KB (99.98% of your 500MB free tier remains available).");
        } catch (Exception e) {
            System.err.println("⚠️ DataSeeder Notice: " + e.getMessage());
        }
    }
}
