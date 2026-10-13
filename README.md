# 🌍 TerraLuxe — Fullstack Tourism & Travel Platform

> Decoupled Fullstack Travel & Tourism Web Platform:  
> **Java 17/21 & Spring Boot 3 with Spring Data MongoDB** backend + **React (Vite + JSX)** frontend.

Designed with a cohesive luxury travel aesthetic (*Midnight Sapphire & Sahara Amber*), featuring in-depth tourism dossiers, verified landmark entrance fees, prime seasonal windows, interactive day-by-day itineraries, and real-time traveler reviews.

---

## 📁 Project Directory Structure

```text
my-fullstack-app/ (d:/blog)
├── .env                           # 🔑 Environment variables (Mongo URI, Ports)
├── .env.example                   # 📄 Environment template (Committed to Git)
├── .gitignore                     # Git ignore rules (target/, node_modules/, etc.)
├── docker-compose.yml             # Docker orchestration (MongoDB 7 + Spring Boot + React)
├── README.md                      # Comprehensive project guide & API docs
│
├── backend/                       # ☕ Java / Spring Boot 3 + Spring Data MongoDB
│   ├── .mvn/wrapper/              # Maven Wrapper
│   ├── src/main/java/com/company/app/
│   │   ├── config/
│   │   │   ├── CorsConfig.java    # CORS configuration for Vite React
│   │   │   ├── OpenApiConfig.java # Swagger UI configuration
│   │   │   └── DataSeeder.java    # Seeds MongoDB Atlas automatically on startup
│   │   ├── controller/
│   │   │   ├── DestinationController.java # /api/v1/destinations
│   │   │   ├── BlogPostController.java    # /api/v1/blogs
│   │   │   └── ReviewController.java      # /api/v1/reviews
│   │   ├── exception/
│   │   │   ├── ResourceNotFoundException.java
│   │   │   ├── ErrorResponse.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── model/
│   │   │   ├── Destination.java   # @Document(collection = "destinations")
│   │   │   ├── Attraction.java    # Embedded sight/landmark document
│   │   │   ├── BlogPost.java      # @Document(collection = "blog_posts")
│   │   │   └── Review.java        # @Document(collection = "reviews")
│   │   ├── repository/
│   │   │   ├── DestinationRepository.java # MongoRepository<Destination, String>
│   │   │   ├── BlogPostRepository.java    # MongoRepository<BlogPost, String>
│   │   │   └── ReviewRepository.java      # MongoRepository<Review, String>
│   │   ├── service/
│   │   │   ├── DestinationService.java
│   │   │   ├── BlogPostService.java
│   │   │   └── ReviewService.java
│   │   └── Application.java       # Spring Boot main entry point
│   ├── src/main/resources/
│   │   └── application.yml        # Configures Spring Data MongoDB URI & Swagger
│   ├── pom.xml                    # Maven build dependencies
│   ├── mvnw.cmd                   # Windows Maven wrapper
│   └── Dockerfile                 # Multi-stage Java build
│
└── frontend/                      # ⚛️ React Front-end (Vite + JSX)
    ├── public/
    │   └── favicon.svg            # Compass rose branding
    ├── src/
    │   ├── assets/
    │   │   └── index.css          # Design system tokens & animations
    │   ├── components/
    │   │   ├── Navbar.jsx         # Sticky glassmorphic header, search & bookmarks
    │   │   ├── HeroBanner.jsx     # Cinematic hero with trending shortcuts
    │   │   ├── DestinationCard.jsx # Tourism card with season, budget & rating
    │   │   ├── DestinationGrid.jsx # Filter by continent, budget, vibe & search
    │   │   ├── BlogPostCard.jsx   # Curated travel articles with read time
    │   │   ├── AttractionGuide.jsx# Verified sights with fees, hours & insider tips
    │   │   ├── WeatherBadge.jsx   # Climate & prime seasonal window advisor
    │   │   ├── ReviewSection.jsx  # Traveler reviews & interactive star form
    │   │   ├── ItineraryPlanner.jsx # Day-by-day scheduler & budget estimator
    │   │   ├── NewsletterCTA.jsx  # VIP travel dispatch subscription form
    │   │   └── Footer.jsx         # Global footer with continent directories
    │   ├── context/
    │   │   └── TravelContext.jsx  # Global state (bookmarks, navigation, filters)
    │   ├── hooks/
    │   │   ├── useDestinations.js # React hook for destinations
    │   │   └── useBlogPosts.js    # React hook for articles
    │   ├── pages/
    │   │   ├── HomePage.jsx       # Landing page with hero, top picks, stories & stats
    │   │   ├── DestinationsPage.jsx # Worldwide tourism directory with search & filters
    │   │   ├── DestinationDetailPage.jsx # Full tourism dossier with sights & reviews
    │   │   ├── BlogPage.jsx       # Travel stories & expedition guides directory
    │   │   ├── BlogPostDetailPage.jsx # Article view with author bio & related guides
    │   │   └── ItineraryPage.jsx  # Custom trip architect & readiness checklist
    │   ├── services/
    │   │   ├── api.js             # API client with auto backend + offline mock fallback
    │   │   └── mockData.js        # Seed tourism data for immediate offline preview
    │   ├── App.jsx                # Client-side router & toast notification container
    │   └── main.jsx               # React application entry point
    ├── index.html                 # HTML template with Google Fonts
    ├── package.json               # Pure JSX React dependencies
    ├── vite.config.js             # Vite configuration with backend proxy
    └── Dockerfile                 # Multi-stage production Nginx container
```

---

## 🍃 Linking MongoDB Atlas to Java Spring Boot

In [**`backend/src/main/resources/application.yml`**](file:///d:/blog/backend/src/main/resources/application.yml) (or root [**`.env`**](file:///d:/blog/.env)):

```yaml
spring:
  data:
    mongodb:
      uri: mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/terraluxe_travel_db?retryWrites=true&w=majority
```

1. Replace `<username>` with your Atlas database username.
2. Replace `<password>` with your Atlas database user password.
3. Make sure in **MongoDB Atlas** -> **Network Access** that you clicked **"Allow Access from Anywhere"** (`0.0.0.0/0`).

---

## 🚀 How to Run

### 1. Java Spring Boot Backend
Open a terminal in `backend/`:
```bash
cd backend
./mvnw.cmd spring-boot:run
```
*(Or if you have Maven installed: `mvn spring-boot:run`)*  
- Spring Boot starts on `http://localhost:8080`
- Automatically seeds MongoDB Atlas with tourism destinations, sights, reviews, and travel articles!
- Interactive Swagger UI available at: `http://localhost:8080/swagger-ui.html`

### 2. React JSX Frontend
Open a separate terminal in `frontend/`:
```bash
cd frontend
npm install
npm run dev
```
- Frontend starts on `http://localhost:3000` (or `http://localhost:5173`)
- Seamlessly communicates with your Spring Boot REST APIs!

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/destinations` | Get destinations (supports `?continent=`, `?budget=`, `?vibe=`, `?search=`) |
| `GET` | `/api/v1/destinations/featured` | Get featured destinations |
| `GET` | `/api/v1/destinations/{id}` | Get full destination dossier with attractions & reviews |
| `POST` | `/api/v1/destinations` | Create a destination |
| `GET` | `/api/v1/blogs` | Get travel stories (supports `?category=`, `?search=`) |
| `GET` | `/api/v1/blogs/slug/{slug}` | Get article by slug |
| `GET` | `/api/v1/reviews/destination/{id}` | Get reviews for a destination |
| `POST` | `/api/v1/reviews/destination/{id}` | Submit a review & auto-recalculate star rating |
| `GET` | `/swagger-ui.html` | Interactive Swagger API Explorer |
