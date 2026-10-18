.PHONY: run stop restart install logs

PID_FILE=.dev.pid

install:
	bun install

run:
	@setsid bun dev > dev.log 2>&1 & echo $$! > $(PID_FILE)
	@echo "Front rodando (PID $$(cat $(PID_FILE))), log em dev.log"

stop:
	@echo "Stopping..."
	@-if [ -f $(PID_FILE) ]; then kill -TERM -- -$$(cat $(PID_FILE)) && rm -f $(PID_FILE); fi
	@echo "Stopped!"

restart: stop run

logs:
	@trap 'exit 0' INT; tail -n 50 -f dev.log
