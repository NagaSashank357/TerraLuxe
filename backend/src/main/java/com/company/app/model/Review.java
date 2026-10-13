package com.company.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
public class Review {

    @Id
    private String id;
    private String destinationId;
    private String authorName;
    private String authorAvatarUrl;
    private Integer rating;
    private String comment;
    private String travelType;
    private String visitedDate;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Review() {}

    public Review(String destinationId, String authorName, String authorAvatarUrl,
                  Integer rating, String comment, String travelType, String visitedDate) {
        this.destinationId = destinationId;
        this.authorName = authorName;
        this.authorAvatarUrl = authorAvatarUrl;
        this.rating = rating;
        this.comment = comment;
        this.travelType = travelType;
        this.visitedDate = visitedDate;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDestinationId() { return destinationId; }
    public void setDestinationId(String destinationId) { this.destinationId = destinationId; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getAuthorAvatarUrl() { return authorAvatarUrl; }
    public void setAuthorAvatarUrl(String authorAvatarUrl) { this.authorAvatarUrl = authorAvatarUrl; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getTravelType() { return travelType; }
    public void setTravelType(String travelType) { this.travelType = travelType; }

    public String getVisitedDate() { return visitedDate; }
    public void setVisitedDate(String visitedDate) { this.visitedDate = visitedDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
