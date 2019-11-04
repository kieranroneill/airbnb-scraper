FROM node:10-slim

# Declare the build arguments passed in.
ARG COOKIE_SECRET
ARG MONGODB_URI
ARG PORT

ENV COOKIE_SECRET $COOKIE_SECRET
ENV MONGODB_URI $MONGODB_URI
ENV NODE_ENV production
ENV PORT $PORT

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies using yarn.
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install --production=false

# Create directories and copy node_modules.
RUN mkdir -p /usr/app \
    && cd /usr/app \
    && ln -s /tmp/node_modules

# Set working directory.
WORKDIR /usr/app

# Copy source files.
ADD . /usr/app

# Build app.
RUN yarn build

# Open up the port
EXPOSE $PORT

# Fly my pretties!!
CMD ["/bin/sh", "-c", "node ./dist/index.js"]
