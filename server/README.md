# Star Notary API

This is a simple api service for the star notary project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node V10.9.0+

```
brew install nvm
nvm install stable
```

### Installing

A step by step to get up and running.

```
npm install
npm start
```

## API Endpoint

The following endpoints are available:

| Endpoints              | Usage                    | Params               |
| ---------------------- | ------------------------ | -------------------- |
| `GET /star/:starToken` | Get a star by its token. | **token** - [Number] |
