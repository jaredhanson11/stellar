# latest = latest
version=latest
docker-user=jaredhanson11
name=${docker-user}/suess

build:
	docker build . -t ${name}:${version}
push: build
	docker push ${name}:${version}
