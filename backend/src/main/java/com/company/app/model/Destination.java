package com.company.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "destinations")
public class Destination {

    @Id
    private String id;
    private String name;
    private String country;
    private String continent;
    private String tagline;
    private String description;
    private String heroImageUrl;
    private String thumbnailUrl;
    private String bestSeason;
    private String currency;
    private String language;
    private String budgetLevel; // Budget, Moderate, Luxury
    private String travelVibe; // Cultural, Coastal, Alpine, Adventure, Urban, Relaxation
    private Double averageDailyCost; // In USD
    private Double rating = 4.8;
    private Integer reviewsCount = 0;
    private Boolean featured = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    private List<Attraction> attractions = new ArrayList<>();

    public Destination() {}

    public Destination(String name, String country, String continent, String tagline, String description,
                       String heroImageUrl, String thumbnailUrl, String bestSeason, String currency,
                       String language, String budgetLevel, String travelVibe, Double averageDailyCost,
                       Double rating, Integer reviewsCount, Boolean featured) {
        this.name = name;
        this.country = country;
        this.continent = continent;
        this.tagline = tagline;
        this.description = description;
        this.heroImageUrl = heroImageUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.bestSeason = bestSeason;
        this.currency = currency;
        this.language = language;
        this.budgetLevel = budgetLevel;
        this.travelVibe = travelVibe;
        this.averageDailyCost = averageDailyCost;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.featured = featured;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getContinent() { return continent; }
    public void setContinent(String continent) { this.continent = continent; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getHeroImageUrl() { return heroImageUrl; }
    public void setHeroImageUrl(String heroImageUrl) { this.heroImageUrl = heroImageUrl; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getBestSeason() { return bestSeason; }
    public void setBestSeason(String bestSeason) { this.bestSeason = bestSeason; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getBudgetLevel() { return budgetLevel; }
    public void setBudgetLevel(String budgetLevel) { this.budgetLevel = budgetLevel; }

    public String getTravelVibe() { return travelVibe; }
    public void setTravelVibe(String travelVibe) { this.travelVibe = travelVibe; }

    public Double getAverageDailyCost() { return averageDailyCost; }
    public void setAverageDailyCost(Double averageDailyCost) { this.averageDailyCost = averageDailyCost; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(Integer reviewsCount) { this.reviewsCount = reviewsCount; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<Attraction> getAttractions() { return attractions; }
    public void setAttractions(List<Attraction> attractions) { this.attractions = attractions; }
}
