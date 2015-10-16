
dev:
	@webpack-dev-server -d --inline --hot --content-base example/
	@open http://localhost:8080/webpack-dev-server/bundle

test-webpack:
	@open http://localhost:8080/bundle
	@cd test && webpack-dev-server --hot --inline

umd:
	@webpack lib/grid.js target/exgrid.js --output-library exgrid --output-library-target umd

test:
	@node_modules/.bin/karma start --single-run

test-coveralls:
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@node_modules/.bin/karma start --single-run && \
		cat ./coverage/lcov/lcov.info | ./node_modules/coveralls/bin/coveralls.js

.PHONY: test
