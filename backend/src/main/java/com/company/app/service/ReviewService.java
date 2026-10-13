package com.company.app.service;

import com.company.app.exception.ResourceNotFoundException;
import com.company.app.model.Destination;
import com.company.app.model.Review;
import com.company.app.repository.DestinationRepository;
import com.company.app.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final DestinationRepository destinationRepository;

    public ReviewService(ReviewRepository reviewRepository, DestinationRepository destinationRepository) {
        this.reviewRepository = reviewRepository;
        this.destinationRepository = destinationRepository;
    }

    public List<Review> getReviewsByDestination(String destinationId) {
        return reviewRepository.findByDestinationIdOrderByCreatedAtDesc(destinationId);
    }

    public Review addReview(String destinationId, Review review) {
        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + destinationId));

        review.setDestinationId(destinationId);
        Review saved = reviewRepository.save(review);

        // Recalculate average rating and reviews count
        List<Review> allReviews = reviewRepository.findByDestinationIdOrderByCreatedAtDesc(destinationId);
        double avg = allReviews.stream().mapToInt(Review::getRating).average().orElse(5.0);
        destination.setRating(Math.round(avg * 10.0) / 10.0);
        destination.setReviewsCount(allReviews.size());
        destinationRepository.save(destination);

        return saved;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public void deleteReview(String id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        String destinationId = review.getDestinationId();
        reviewRepository.deleteById(id);

        if (destinationId != null) {
            destinationRepository.findById(destinationId).ifPresent(destination -> {
                List<Review> remaining = reviewRepository.findByDestinationIdOrderByCreatedAtDesc(destinationId);
                double avg = remaining.isEmpty() ? 4.8 : remaining.stream().mapToInt(Review::getRating).average().orElse(4.8);
                destination.setRating(Math.round(avg * 10.0) / 10.0);
                destination.setReviewsCount(remaining.size());
                destinationRepository.save(destination);
            });
        }
    }
}
