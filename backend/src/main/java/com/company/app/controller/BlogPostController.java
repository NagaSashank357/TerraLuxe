package com.company.app.controller;

import com.company.app.model.BlogPost;
import com.company.app.service.BlogPostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs")
@Tag(name = "Blog Posts", description = "Endpoints for travel stories, itineraries, and insider tips")
@CrossOrigin(originPatterns = "*")
public class BlogPostController {

    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping
    @Operation(summary = "Get all blog posts with category or keyword search")
    public ResponseEntity<List<BlogPost>> getAllBlogPosts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(blogPostService.getAllBlogPosts(category, search));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured blog articles")
    public ResponseEntity<List<BlogPost>> getFeaturedBlogPosts() {
        return ResponseEntity.ok(blogPostService.getFeaturedBlogPosts());
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get a blog post by its URL slug")
    public ResponseEntity<BlogPost> getBlogPostBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogPostService.getBlogPostBySlug(slug));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a blog post by ID")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable String id) {
        return ResponseEntity.ok(blogPostService.getBlogPostById(id));
    }

    @GetMapping("/destination/{destinationId}")
    @Operation(summary = "Get all blog articles related to a destination")
    public ResponseEntity<List<BlogPost>> getBlogPostsByDestination(@PathVariable String destinationId) {
        return ResponseEntity.ok(blogPostService.getBlogPostsByDestination(destinationId));
    }

    @PostMapping
    @Operation(summary = "Publish a new travel blog post")
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        return new ResponseEntity<>(blogPostService.createBlogPost(blogPost), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing travel blog post")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable String id, @RequestBody BlogPost blogPost) {
        return ResponseEntity.ok(blogPostService.updateBlogPost(id, blogPost));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a blog post by ID")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable String id) {
        blogPostService.deleteBlogPost(id);
        return ResponseEntity.noContent().build();
    }
}
