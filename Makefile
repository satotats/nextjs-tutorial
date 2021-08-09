mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

service_name = node-dev
container_name = node
sn = $(service_name)
cn = $(container_name)

cmd =
c = $(cmd)

exec:
	docker exec -it $(cn) bash

	
