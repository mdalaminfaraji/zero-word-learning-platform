## Docker Setup and Maintenance

### Running the Application

```bash
docker-compose up -d
```

### Viewing Logs

```bash
docker-compose logs -f
```

### Health Check

The application includes a health check endpoint at `/api/health`. You can test it directly:

```bash
curl http://localhost:3000/api/health
```

### Maintenance Tips

1. **Resource Monitoring**:

   ```bash
   docker stats
   ```

2. **Cleaning Up**:

   ```bash
   docker system prune -f
   ```

3. **Rebuilding Images**:

   ```bash
   docker-compose up -d --build
   ```

4. **Checking Container Health**:

   ```bash
   docker ps --filter "health=healthy"
   ```

5. **Viewing Resource Usage**:
   ```bash
   docker stats $(docker ps --format={{.Names}})
   ```

### Common Commands

- Stop containers: `docker-compose down`
- Restart containers: `docker-compose restart`
- View running containers: `docker ps`
- Access container shell: `docker exec -it <container_id> sh`
