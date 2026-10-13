package com.company.app.model;

/**
 * Tourist Attraction / Cultural Sight (Embedded within Destination document)
 */
public class Attraction {

    private String name;
    private String category; // Historical, Nature, Gastronomy, Landmark, Beach
    private String description;
    private String imageUrl;
    private String entryFee;
    private String openingHours;
    private String recommendedDuration;
    private String insiderTip;

    public Attraction() {}

    public Attraction(String name, String category, String description, String imageUrl,
                      String entryFee, String openingHours, String recommendedDuration, String insiderTip) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
        this.entryFee = entryFee;
        this.openingHours = openingHours;
        this.recommendedDuration = recommendedDuration;
        this.insiderTip = insiderTip;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getEntryFee() { return entryFee; }
    public void setEntryFee(String entryFee) { this.entryFee = entryFee; }

    public String getOpeningHours() { return openingHours; }
    public void setOpeningHours(String openingHours) { this.openingHours = openingHours; }

    public String getRecommendedDuration() { return recommendedDuration; }
    public void setRecommendedDuration(String recommendedDuration) { this.recommendedDuration = recommendedDuration; }

    public String getInsiderTip() { return insiderTip; }
    public void setInsiderTip(String insiderTip) { this.insiderTip = insiderTip; }
}
