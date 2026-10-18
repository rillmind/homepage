.PHONY: run stop run-back run-front stop-back stop-front restart-back restart-front install install-back install-front start logs logs-back logs-front

install-back:
	$(MAKE) -C back-end install

install-front:
	$(MAKE) -C back-end install

install: install-back install-front

run-back:
	$(MAKE) -C back-end run

run-front:
	$(MAKE) -C front-end run

run: run-back run-front

start: run

stop-back:
	$(MAKE) -C back-end stop

stop-front:
	$(MAKE) -C front-end stop

stop: stop-back stop-front

restart-back:
	$(MAKE) -C back-end restart

restart-front:
	$(MAKE) -C front-end restart

restart: restart-back restart-front

BACK_LOG=back-end/server.log
FRONT_LOG=front-end/dev.log

logs-back:
	@trap 'exit 0' INT; tail -n 50 -f $(BACK_LOG)

logs-front:
	@trap 'exit 0' INT; tail -n 50 -f $(FRONT_LOG)

logs:
	@trap 'exit 0' INT; tail -n 50 -f $(BACK_LOG) $(FRONT_LOG)
