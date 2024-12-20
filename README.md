# pixi-card-server init with typescript-node

Template for building nodejs and typescript services. The main goal of this boilerplate is to offer a good Developer Experience (eg: debugging, watch and recompile) by providing the following features out of the box:

**_Features_**

- Language - [TypeScript](https://www.typescriptlang.org/)
- REST API - [koa2](http://koajs.com/)
- Graceful Shutdown - [Pattern](https://nemethgergely.com/nodejs-healthcheck-graceful-shutdown/)
- HealthCheck - [Pattern /health](http://microservices.io/patterns/observability/health-check-api.html)
- SQL Database & Migrations - [knex](http://knexjs.org/)
- Authentication and Authorization - [JWT](https://github.com/auth0/node-jsonwebtoken)
- Validation - [Joi](https://github.com/hapijs/joi)
- Testing - [Mocha](https://mochajs.org/) [Chai](http://www.chaijs.com/) + [Sinon](http://sinonjs.org/) [Coverage](https://istanbul.js.org/)
- Code Style - [Prettier](https://prettier.io/)
- Git Hooks - [Husky](https://github.com/typicode/husky)

## Installation & Run

- _npm install_ - Install dependencies
- _npm run start_ - Start application (It needs a mysql database)

### Running with Docker

- _docker-compose up_ (compose and run, it also creates the mysql database)
- _docker-compose down_ (Destroy application and mysql containers)

## Useful npm commands

- _npm run build_ - Transpile TypeScript code
- _npm run clean_ - Remove dist, node_modules, coverage folders
- _npm run coverage_ - Run NYC coverage
- _npm run lint_ - Lint your TypeScript code
- _npm run start:dev_ - Run application in dev mode (debug & watch). Debug mode is running on port 5858 (open `chrome://inspect/#devices`).
- _npm run test_ - Run unit tests
- _npm run test:integration_ - Run integration tests
- _npm run test:all_ - Run Unit and Integration tests
