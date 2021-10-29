
### DEV
build-dev:
	cd frontend && $(MAKE) build-dev
	cd backend && $(MAKE) build-dev

run-dev: 
	ENV=dev docker-compose -f docker-compose-dev.yml up


### LOCAL
build-local:
	cd frontend && $(MAKE) build-local
	cd backend && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up
		

### PROD

build-production:
	cd frontend && $(MAKE) build-production
	cd backend && $(MAKE) build-production

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up

### REMOTE

SSH_STRING:=root@161.35.28.189

ssh:
	ssh $(SSH_STRING)


# apt install make

copy-files:
	scp -r ./* $(SSH_STRING):/root/

# when you add firewall rule, have to add SSH on port 22 or it will stop working

# run challenge with cloudflare on flexible, then bump to full
