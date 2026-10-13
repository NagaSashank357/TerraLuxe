package com.company.app.repository;

import com.company.app.model.BlogPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends MongoRepository<BlogPost, String> {

    Optional<BlogPost> findBySlug(String slug);

    List<BlogPost> findByCategoryIgnoreCase(String category);

    List<BlogPost> findByFeaturedTrue();

    List<BlogPost> findByDestinationId(String destinationId);

    @Query("{ '$or': [ " +
           "{ 'title': { '$regex': ?0, '$options': 'i' } }, " +
           "{ 'excerpt': { '$regex': ?0, '$options': 'i' } }, " +
           "{ 'content': { '$regex': ?0, '$options': 'i' } } " +
           "] }")
    List<BlogPost> searchBlogPosts(String search);
}
