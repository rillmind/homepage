.PHONY: build run test stop restart logs

Binary_name=main
LOG_FILE=server.log

install:
	go get ./...

build:
	@echo "Building..."
	@go build -v -o bin/${Binary_name} ./cmd/server
	@echo "Built"

run: build
	@setsid ./bin/${Binary_name} > $(LOG_FILE) 2>&1 &
	@echo "Back rodando, log em $(LOG_FILE)"

stop:
	@echo "Stopping..."
	@-pkill -SIGTERM -f "./bin/${Binary_name}"
	@echo "Stopped!"

restart: stop run

logs:
	@trap 'exit 0' INT; tail -n 50 -f $(LOG_FILE)
