package com.company.app.service;

import com.company.app.exception.ResourceNotFoundException;
import com.company.app.model.Destination;
import com.company.app.repository.DestinationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    public List<Destination> getAllDestinations(String continent, String budget, String vibe, String search) {
        if (search != null && !search.trim().isEmpty()) {
            return destinationRepository.searchDestinations(search.trim());
        }
        if (continent != null && !continent.trim().isEmpty() && !continent.equalsIgnoreCase("all")) {
            return destinationRepository.findByContinentIgnoreCase(continent.trim());
        }
        if (budget != null && !budget.trim().isEmpty() && !budget.equalsIgnoreCase("all")) {
            return destinationRepository.findByBudgetLevelIgnoreCase(budget.trim());
        }
        if (vibe != null && !vibe.trim().isEmpty() && !vibe.equalsIgnoreCase("all")) {
            return destinationRepository.findByTravelVibeIgnoreCase(vibe.trim());
        }
        return destinationRepository.findAll();
    }

    public Destination getDestinationById(String id) {
        return destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with id: " + id));
    }

    public List<Destination> getFeaturedDestinations() {
        return destinationRepository.findByFeaturedTrue();
    }

    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    public Destination updateDestination(String id, Destination updated) {
        Destination existing = getDestinationById(id);
        existing.setName(updated.getName());
        existing.setCountry(updated.getCountry());
        existing.setContinent(updated.getContinent());
        existing.setTagline(updated.getTagline());
        existing.setDescription(updated.getDescription());
        existing.setHeroImageUrl(updated.getHeroImageUrl());
        existing.setThumbnailUrl(updated.getThumbnailUrl());
        existing.setBestSeason(updated.getBestSeason());
        existing.setCurrency(updated.getCurrency());
        existing.setLanguage(updated.getLanguage());
        existing.setBudgetLevel(updated.getBudgetLevel());
        existing.setTravelVibe(updated.getTravelVibe());
        existing.setAverageDailyCost(updated.getAverageDailyCost());
        existing.setFeatured(updated.getFeatured());
        if (updated.getAttractions() != null) {
            existing.setAttractions(updated.getAttractions());
        }
        return destinationRepository.save(existing);
    }

    public void deleteDestination(String id) {
        if (!destinationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Destination not found with id: " + id);
        }
        destinationRepository.deleteById(id);
    }
}
