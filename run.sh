docker compose down
docker volume rm $(docker volume ls -q)

docker compose build mysql
docker compose build crawler
docker compose build node-ui

docker compose up -d
