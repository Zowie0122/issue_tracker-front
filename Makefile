# Start the container, keep stdout attached
start:
	docker compose up --abort-on-container-exit

# Rebuild containers without cache
cc:
	docker compose build --no-cache

# Rebuild and run the container, keep stdout attached
restart:
	docker-compose up --force-recreate --build --abort-on-container-exit

# Start the container, detach stdout
up: docker-compose up -d

# Rebuild and run the container, detach stdout
rebuild: 
	docker-compose up -d --force-recreate --build

# Stop and remove containers
down: 
	docker-compose down

reset: 
	down rebuild

react-root: 
	docker exec -it issue_tracker_frontend /bin/ash

ash-react: 
	docker exec -it --user=app issue_tracker_frontend /bin/ash

