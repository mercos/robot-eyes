FROM node:10.15.3

ARG ROBOT_EYES_VERSION=1.0.22

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

WORKDIR /usr/src
COPY package.json .
RUN npm install -g yarn && \
    yarn add robot-eyes@${ROBOT_EYES_VERSION}

ENV NODE_PATH=/usr/src/node_modules PATH=/usr/src/node_modules/.bin:${PATH}

ENTRYPOINT ["robot-eyes"]
