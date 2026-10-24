#!/usr/bin/env bash
docker build \
--build-arg GIT_COMMIT="$(git rev-parse --short HEAD)" \
--build-arg GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)" \
--build-arg GIT_DATE="$(git show -s --format=%ci)" \
-t web .