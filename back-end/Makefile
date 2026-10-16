.PHONY: build run test stop restart

Binary_name=main

install:
	go get ./...

build:
	@echo "Building..."
	@go build -v -o bin/${Binary_name} ./cmd/server
	@echo "Built"

run: build
	./bin/main &
	@echo "Running..."

stop:
	@echo "Stopping..."
	@-pkill -SIGTERM -f "./bin/${Binary_name}"
	@echo "Stopped!"

restart: stop run
