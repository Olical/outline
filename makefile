default:
	@echo 'Commands: submodules, server'

# Initialise all submodules
submodules:
	git submodule update --init

# Runs a simple HTTP server for testing
server:
	python -m SimpleHTTPServer