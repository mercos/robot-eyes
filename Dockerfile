FROM node:16.13.0-alpine

ARG ROBOT_EYES_VERSION=latest

RUN apk add --no-cache \
    build-base \
    ca-certificates \
    cairo-dev \
    chromium \
    curl \
    freetype \
    harfbuzz \
    nss \
    pango-dev \
    pixman-dev \
    python3 \
    ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src

COPY package.json .
COPY package-lock.json .
RUN npm install -g npm
RUN npm install

COPY . .
RUN npm link

ENV NODE_PATH=/usr/local/lib/node_modules

ENTRYPOINT ["robot-eyes"]
