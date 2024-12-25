# Use the official Bun image for the initial stages
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install dependencies into a temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install

# Copy production dependencies and built files into the final image
# Start fresh from the base to reduce the final image size
FROM base AS release
WORKDIR /usr/src/app
COPY --from=install /temp/prod/node_modules /usr/src/app/node_modules
COPY --from=prerelease /usr/src/app/.output /usr/src/app/.output
COPY package.json /usr/src/app/

# Expose the port your app runs on
EXPOSE 3000/tcp

# Get Host from environment variable
# This is used to allow the container to be run on any host
ENV NUXT_HOST=0.0.0.0

ENTRYPOINT ["sh", "-c", "bun run /usr/src/app/.output/server/index.mjs --host $NUXT_HOST"]
