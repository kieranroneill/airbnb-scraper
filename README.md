# Airbnb Scraper

A simple web scrapper that uses Puppeteer under the hood to scrape an Airbnb listing and shove it into a MongoDB.

#### Table of contents

* [Introduction](#introduction)
* [Getting started](#getting-started)
    * [1. Prerequisites](#1-prerequisites)
    * [2. Running the server](#2-running-the-server)
* [Development](#development)
    * [1. Setting up the dev environment](#1-setting-up-the-dev-environment)
    * [2. Running locally](#2-running-locally)
    * [3. Testing](#3-testing)
* [Credits](#credits)

## Introduction

Below is a quick outline of the structure of the app:

```text
.
├── api                        # API routes
|   ├── listing.ts
│   └── ...
├── config                     # Various configuration objects
|   ├── db.ts   
│   └── ...
├── interfaces                 # TS interfaces
|   ├── listing.ts
│   └── ...
├── middlewares                # Custom Express middlewares
|   ├── errorHandler.ts
│   ├── ...
├── models                     # MongoDB models
|   ├── listing.ts
│   └── ...
├── modules                    # Modules are used to separate code to make it more testable
|   ├── puppeteer              # This handles all the Puppeteer magic
|   |   ├── scrapeListing.ts
|   |   ├── index.ts
|   │   └── ...
│   └── ...
├── schemas                    # MongoDB schemas
|   ├── listing.ts
│   └── ...
├── index.ts                   # Entrypoint - starts the server.
└── server.ts                  # This is where the Express app is setup and configured.
```

## Getting started

These are the instructions that tell you how to get up and running.

### 1. Prerequisites

* Install [Docker](https://docs.docker.com/install/)
* Install [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Running the server

1. Build the image and start the container:

```shell script
docker-compose up
```

2. Once the container is up it will be running on: [http://localhost:1337](http://localhost:1337)

## Development

### 1. Setting up the dev environment

* Install [Node.js v6.11.0+](https://nodejs.org/en/)
* Install [MongoDB](https://www.mongodb.com/download-center/community)
* Install [Yarn](https://yarnpkg.com/lang/en/docs/install)
* (Optional) Install a MongoDB GUI client. I recommend [MongoDB Compass](https://www.mongodb.com/download-center/compass)... for no other reason other then I use it and couldn't be arsed to test others.

### 2. Running locally

1. Install the `node_modules`:
```shell script
yarn install
```

2. Copy the `.env.example` into a `.env` file using:
```shell script
cp -n .env.example .env
```

3. Ensure MongoDB is running.

4. Start the server:
```shell script
yarn start
```

5. You can check the API using the following cURL command:
```shell script
curl -X POST \
  http://localhost:1337/api/listing \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://www.airbnb.co.uk/rooms/28299515?location=London%2C%20United%20Kingdom&toddlers=0&_set_bev_on_new_domain=1572300146_ZKC6996OiM8G0CT3&source_impression_id=p3_1572300147_bRb1KSr%2FXjuPRPDg&guests=1&adults=1"}'
```

6. (Optional) If you installed a MongoDB GUI client, you can now see the listing has been created/updated. 

### 3. Testing

* You can run the tests using:
```shell script
yarn test
```

* You shouldn't need your `mongod` running (or even installed) as the tests spin up an in-memory MongoDB and tear down at the end.

## Credits

* Credit to [nodkz](https://github.com/nodkz) and his [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server). I discovered it building this project and I am thoroughly impressed!
