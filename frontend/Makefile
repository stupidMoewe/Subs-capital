
build-dev:
	docker build -t react-app-dev -f Dockerfile.dev .

###################

build-local:
	docker build \
		-t react-app-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:5000 \
		-f Dockerfile.production .

###################

build-production:
	docker build \
		-t react-app-production:production \
		--build-arg CADDYFILE=Caddyfile.production \
		--build-arg BASE_URL=https://www.subs-capital.fr \
		-f Dockerfile.production .