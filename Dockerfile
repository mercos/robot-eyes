FROM node:10.15.3

ARG ROBOT_EYES_VERSION=latest

RUN apt-get update && apt-get install --no-install-recommends -y \
    libgtk-3-0 \
    libx11-xcb1 \
    libxtst6 \
    libnss3 \
    libnspr4 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatspi2.0-0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV DOCKERIZE_VERSION v0.6.1
RUN curl -Lo dockerize.tar.gz https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize.tar.gz \
    && rm dockerize.tar.gz

WORKDIR /usr/src
RUN npm install -g yarn
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn add file:.

ENV NODE_PATH=/usr/src/node_modules PATH=/usr/src/node_modules/.bin:${PATH}

ENTRYPOINT ["robot-eyes"]
