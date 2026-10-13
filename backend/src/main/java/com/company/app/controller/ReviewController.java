package com.company.app.controller;

import com.company.app.model.Review;
import com.company.app.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
@Tag(name = "Reviews", description = "Endpoints for tourist ratings and reviews")
@CrossOrigin(originPatterns = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    @Operation(summary = "Get all reviews across all destinations (Admin)")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/destination/{destinationId}")
    @Operation(summary = "Get all reviews for a destination")
    public ResponseEntity<List<Review>> getReviewsByDestination(@PathVariable String destinationId) {
        return ResponseEntity.ok(reviewService.getReviewsByDestination(destinationId));
    }

    @PostMapping("/destination/{destinationId}")
    @Operation(summary = "Submit a traveler review and star rating for a destination")
    public ResponseEntity<Review> addReview(
            @PathVariable String destinationId,
            @RequestBody Review review) {
        return new ResponseEntity<>(reviewService.addReview(destinationId, review), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a review by ID (Admin)")
    public ResponseEntity<Void> deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
