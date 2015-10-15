
dev:
	@webpack-dev-server -d --inline --hot --content-base example/
	@open http://localhost:8080/webpack-dev-server/bundle

test-webpack:
	@open http://localhost:8080/bundle
	@cd test && webpack-dev-server --hot --inline

test:
	@node_modules/.bin/karma start --single-run

.PHONY: test
