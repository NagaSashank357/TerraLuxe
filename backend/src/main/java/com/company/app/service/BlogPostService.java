package com.company.app.service;

import com.company.app.exception.ResourceNotFoundException;
import com.company.app.model.BlogPost;
import com.company.app.repository.BlogPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPost> getAllBlogPosts(String category, String search) {
        if (search != null && !search.trim().isEmpty()) {
            return blogPostRepository.searchBlogPosts(search.trim());
        }
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            return blogPostRepository.findByCategoryIgnoreCase(category.trim());
        }
        return blogPostRepository.findAll();
    }

    public BlogPost getBlogPostBySlug(String slug) {
        return blogPostRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with slug: " + slug));
    }

    public BlogPost getBlogPostById(String id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
    }

    public List<BlogPost> getFeaturedBlogPosts() {
        return blogPostRepository.findByFeaturedTrue();
    }

    public List<BlogPost> getBlogPostsByDestination(String destinationId) {
        return blogPostRepository.findByDestinationId(destinationId);
    }

    public BlogPost createBlogPost(BlogPost blogPost) {
        if (blogPost.getSlug() == null || blogPost.getSlug().trim().isEmpty()) {
            blogPost.setSlug(blogPost.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)+", ""));
        }
        return blogPostRepository.save(blogPost);
    }

    public BlogPost updateBlogPost(String id, BlogPost updated) {
        BlogPost existing = getBlogPostById(id);
        existing.setTitle(updated.getTitle());
        if (updated.getSlug() != null && !updated.getSlug().trim().isEmpty()) {
            existing.setSlug(updated.getSlug());
        }
        existing.setExcerpt(updated.getExcerpt());
        existing.setContent(updated.getContent());
        existing.setAuthorName(updated.getAuthorName());
        existing.setAuthorAvatarUrl(updated.getAuthorAvatarUrl());
        existing.setCoverImageUrl(updated.getCoverImageUrl());
        existing.setReadTimeMinutes(updated.getReadTimeMinutes());
        existing.setCategory(updated.getCategory());
        existing.setTags(updated.getTags());
        existing.setFeatured(updated.getFeatured());
        existing.setDestinationId(updated.getDestinationId());
        return blogPostRepository.save(existing);
    }

    public void deleteBlogPost(String id) {
        if (!blogPostRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog post not found with id: " + id);
        }
        blogPostRepository.deleteById(id);
    }
}
