# Docker Setup for Hometap Engineering Takehome

This project has been dockerized to make it easy to run both the frontend and backend services.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Production Build

```bash
# Build and start both services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### Development Mode (with hot reloading)

```bash
# Build and start both services in development mode
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d --build
```

## Services

- **Backend (Django)**: http://localhost:8000
- **Frontend (React)**: http://localhost:3000

## Development Workflow

### Backend Development

- The backend service runs Django with auto-reload enabled
- Changes to Python files will automatically restart the server
- The SQLite database is persisted in a volume
- Poetry is used for dependency management

### Frontend Development

- The frontend service runs Vite with hot module replacement
- Changes to React/TypeScript files will automatically reload in the browser
- Node modules are cached in a volume for faster rebuilds

## Useful Commands

```bash
# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Rebuild and restart services
docker-compose up --build

# Access backend shell
docker-compose exec backend python manage.py shell

# Run backend tests
docker-compose exec backend python manage.py test

# Run frontend tests
docker-compose exec frontend yarn test

# Clean up (removes containers, networks, and volumes)
docker-compose down -v
```

## Environment Variables

The backend service uses the following environment variables:

- `DEBUG`: Set to `True` for development
- `DJANGO_SETTINGS_MODULE`: Points to `backend.settings`

## Troubleshooting

### Port Conflicts

If ports 8000 or 3000 are already in use, you can modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "8001:8000" # Map host port 8001 to container port 8000
```

### Build Issues

If you encounter build issues:

1. Clean up Docker cache: `docker system prune -a`
2. Rebuild without cache: `docker-compose build --no-cache`

### Database Issues

If you need to reset the database:

```bash
docker-compose down -v
docker-compose up --build
```

## Production Considerations

For production deployment:

1. Use the production Dockerfiles (without `.dev` suffix)
2. Set `DEBUG=False` in environment variables
3. Use a production database (PostgreSQL, MySQL) instead of SQLite
4. Configure proper CORS settings
5. Set up reverse proxy (nginx) for static file serving
6. Use environment variables for sensitive configuration
