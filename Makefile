.PHONY: run stop run-back run-front stop-back stop-front restart-back restart-front install install-back install-front start

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
