# WithMoney API

It is a project of money control

[![Maintainability](https://api.codeclimate.com/v1/badges/fd2c888e3a8f375c2976/maintainability)](https://codeclimate.com/github/withmoney/withmoney-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b045a34c8cb425bf67f1/test_coverage)](https://codeclimate.com/github/withmoney/withmoney-api/test_coverage)
[![Build Status](https://travis-ci.org/withmoney/withmoney-api.svg?branch=master)](https://travis-ci.org/withmoney/withmoney-api)
[![codecov](https://codecov.io/gh/withmoney/withmoney-api/branch/master/graph/badge.svg)](https://codecov.io/gh/withmoney/withmoney-api)

## Installation

1. `cp config/database.json.example config/database.json`
2. `cp .env.example .env`
3. `yarn`
4. `yarn run sequelize db:create` to create a database
5. `yarn run sequelize db:migrate`


## Development

`yarn run sequelize db:seed:all` in development

run `yarn run dev` to start the server.

## Tests

`yarn run test:createdb` - To create a database of test.
`yarn run pretest` - Apply the migration.
`yarn run jest`

## Production

`yarn run deploy setup # first time`

`yarn run deploy`
