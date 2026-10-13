package com.company.app.repository;

import com.company.app.model.Destination;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends MongoRepository<Destination, String> {

    List<Destination> findByContinentIgnoreCase(String continent);

    List<Destination> findByBudgetLevelIgnoreCase(String budgetLevel);

    List<Destination> findByTravelVibeIgnoreCase(String travelVibe);

    List<Destination> findByFeaturedTrue();

    @Query("{ '$or': [ " +
           "{ 'name': { '$regex': ?0, '$options': 'i' } }, " +
           "{ 'country': { '$regex': ?0, '$options': 'i' } }, " +
           "{ 'tagline': { '$regex': ?0, '$options': 'i' } }, " +
           "{ 'continent': { '$regex': ?0, '$options': 'i' } } " +
           "] }")
    List<Destination> searchDestinations(String search);
}
