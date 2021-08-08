mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))
node_service_name := node
container_name := dev-env

exec:
	docker exec -it $(container_name) bash