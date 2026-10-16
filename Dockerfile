FROM oven/bun:1.4.3-alpine

WORKDIR /usr/src/app

COPY package.json bun.lock* bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . ./

ARG GIT_COMMIT
ARG GIT_BRANCH
ARG GIT_DATE
ENV NUXT_PUBLIC_GIT_COMMIT=$GIT_COMMIT
ENV NUXT_PUBLIC_GIT_BRANCH=$GIT_BRANCH
ENV NUXT_PUBLIC_GIT_DATE=$GIT_DATE

RUN bun run build

ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

CMD ["bun", ".output/server/index.mjs"]