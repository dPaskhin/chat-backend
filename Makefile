up:
	docker-compose up

up-d:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose down
	docker-compose up

build-image:
	docker-compose build --no-cache

rebuild-image:
	docker-compose down && docker image prune -a && docker-compose build --no-cache
