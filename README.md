# Music Site

Full-stack music analytics app that connects to Spotify via OAuth2, fetches user listening data, and enriches artist information with MusicBrainz.

## What This Project Does

- Authenticates users with Spotify OAuth2.
- Shows Spotify profile data.
- Different Colorthemes to pick from.
- Displays top artists and top tracks across time ranges.
- Displays recently played tracks.
- Looks up artist and genre metadata via MusicBrainz.

## Tech Stack

- Frontend: Angular 19, TypeScript, Bootstrap, Chart.js
- Backend: Spring Boot 3, Spring Security OAuth2 Client, Spring Data JPA
- Database: PostgreSQL
- API docs: springdoc OpenAPI (Swagger UI)
- Container support: Docker Compose (PostgreSQL service)

## Project Structure

```text
music-site/
  backend/     Spring Boot API and OAuth2 integration
  frontend/    Angular client
  docker-compose.yml
```

## Prerequisites

- Java 21+
- Node.js 20+ and npm
- Docker (recommended for local PostgreSQL)
- A Spotify developer application (Client ID and Client Secret)

## Local Setup

### 1) Configure secrets (.env)

Credentials are not stored in the repository. They live in a `.env` file in the repository root, which is listed in `.gitignore` and never committed.

Copy the template and fill in your values:

```bash
cp .env.example .env
```

```properties
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

How the values are used:

- `docker-compose.yml` reads `.env` automatically to create the PostgreSQL user.
- `backend/src/main/resources/application-dev.yml` references them as `${DB_USERNAME}`, `${SPOTIFY_CLIENT_ID}`, etc., and loads `.env` through `spring.config.import` (works whether the backend is started from the repository root or from `backend/`).
- Regular environment variables with the same names override `.env`, which is the recommended approach for production.

Important:

- Never commit `.env`. Run `git status` before committing and make sure it is not listed.
- If a secret is ever pushed to GitHub, deleting it is not enough because it stays in git history. Regenerate the Spotify client secret in the Spotify developer dashboard and change the database password.
- When adding a new secret, add its name (without the value) to `.env.example` so other developers know to set it.

### 2) Start PostgreSQL

From the repository root:

```bash
docker compose up -d postgres
```

The database uses the `DB_USERNAME` and `DB_PASSWORD` values from `.env`:

- Host: localhost
- Port: 5432
- Database: music_site

### 3) Configure Spotify OAuth

In your Spotify developer dashboard:

- Create or use an app.
- Add redirect URI: http://127.0.0.1:8080/api/v1/login/oauth2/code/spotify
- Copy the Client ID and Client Secret into `.env`.

### 4) Run Backend (Spring Boot)

From backend:

```bash
./mvnw spring-boot:run
```

Windows (PowerShell or CMD):

```bash
mvnw.cmd spring-boot:run
```

Backend defaults:

- Base URL: http://localhost:8080
- Context path: /api/v1
- Swagger UI: http://localhost:8080/api/v1/swagger-ui/index.html

### 5) Run Frontend (Angular)

From frontend:

```bash
npm install
npm start
```

Frontend runs at:

- http://localhost:4200

## Authentication Flow

1. Open frontend at http://localhost:4200.
2. Click Sign in.
3. Browser is redirected to backend OAuth entry point:
   - http://localhost:8080/api/v1/oauth2/authorization/spotify
4. After successful login, backend redirects to:
   - http://localhost:4200/home

The frontend uses cookie-based session authentication and sends requests with credentials.

## Main API Endpoints

All endpoints are under /api/v1.

- GET /auth
  - Returns authentication status.
- GET /user-profile
  - Returns Spotify user profile.
- GET /stats/top-artists?timeRange=...&limit=...&offset=...
- GET /stats/top-tracks?timeRange=...&limit=...&offset=...
- GET /stats/recent-tracks?limit=...&after=...&before=...
- GET /musicbrainz/artist/{artistName}
- GET /musicbrainz/artist/{mbid}/genres

## Frontend Scripts

From frontend:

- npm start: run Angular dev server
- npm run build: build app
- npm test: run unit tests
- npm run api-gen: generate API client code from OpenAPI file

## Backend Commands

From backend:

- ./mvnw test (or mvnw.cmd test on Windows)
- ./mvnw spring-boot:run (or mvnw.cmd spring-boot:run on Windows)

## Troubleshooting

- 401 or redirect loop:
  - Make sure Spotify redirect URI exactly matches: http://127.0.0.1:8080/api/v1/login/oauth2/code/spotify
  - Confirm backend is running on port 8080 and frontend on 4200.
- CORS issues:
  - Backend CORS is currently configured for http://localhost:4200.
- DB connection errors:
  - Verify postgres container is healthy and credentials match backend config.

## Notes

- Current frontend service URLs are hardcoded to localhost backend endpoints.
- For deployment, move to environment-based configuration in both frontend and backend.

## License

No license file is currently defined in this repository.