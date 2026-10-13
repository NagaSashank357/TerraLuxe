package com.company.app.controller;

import com.company.app.model.Destination;
import com.company.app.model.Review;
import com.company.app.service.DestinationService;
import com.company.app.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/destinations")
@Tag(name = "Destinations", description = "Endpoints for exploring and managing travel destinations")
@CrossOrigin(originPatterns = "*")
public class DestinationController {

    private final DestinationService destinationService;
    private final ReviewService reviewService;

    public DestinationController(DestinationService destinationService, ReviewService reviewService) {
        this.destinationService = destinationService;
        this.reviewService = reviewService;
    }

    @GetMapping
    @Operation(summary = "Get all destinations with optional continent, budget, vibe, or keyword filter")
    public ResponseEntity<List<Destination>> getAllDestinations(
            @RequestParam(required = false) String continent,
            @RequestParam(required = false) String budget,
            @RequestParam(required = false) String vibe,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(destinationService.getAllDestinations(continent, budget, vibe, search));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get top featured destinations")
    public ResponseEntity<List<Destination>> getFeaturedDestinations() {
        return ResponseEntity.ok(destinationService.getFeaturedDestinations());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get full destination details by ID including attractions and reviews")
    public ResponseEntity<Map<String, Object>> getDestinationById(@PathVariable String id) {
        Destination destination = destinationService.getDestinationById(id);
        List<Review> reviews = reviewService.getReviewsByDestination(id);

        Map<String, Object> response = new HashMap<>();
        response.put("id", destination.getId());
        response.put("_id", destination.getId());
        response.put("name", destination.getName());
        response.put("country", destination.getCountry());
        response.put("continent", destination.getContinent());
        response.put("tagline", destination.getTagline());
        response.put("description", destination.getDescription());
        response.put("heroImageUrl", destination.getHeroImageUrl());
        response.put("thumbnailUrl", destination.getThumbnailUrl());
        response.put("bestSeason", destination.getBestSeason());
        response.put("currency", destination.getCurrency());
        response.put("language", destination.getLanguage());
        response.put("budgetLevel", destination.getBudgetLevel());
        response.put("travelVibe", destination.getTravelVibe());
        response.put("averageDailyCost", destination.getAverageDailyCost());
        response.put("rating", destination.getRating());
        response.put("reviewsCount", destination.getReviewsCount());
        response.put("featured", destination.getFeatured());
        response.put("attractions", destination.getAttractions());
        response.put("reviews", reviews);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(summary = "Create a new travel destination")
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        return new ResponseEntity<>(destinationService.createDestination(destination), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing destination")
    public ResponseEntity<Destination> updateDestination(@PathVariable String id, @RequestBody Destination destination) {
        return ResponseEntity.ok(destinationService.updateDestination(id, destination));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a destination by ID")
    public ResponseEntity<Void> deleteDestination(@PathVariable String id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }
}
