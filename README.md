# MyMoney

It is a project of money control

[![Maintainability](https://api.codeclimate.com/v1/badges/a4125a26d0c9b7019652/maintainability)](https://codeclimate.com/github/davidcostadev/mymoney/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a4125a26d0c9b7019652/test_coverage)](https://codeclimate.com/github/davidcostadev/mymoney/test_coverage)
[![Build Status](https://travis-ci.org/davidcostadev/mymoney.svg?branch=master)](https://travis-ci.org/davidcostadev/mymoney)
[![codecov](https://codecov.io/gh/davidcostadev/mymoney/branch/master/graph/badge.svg)](https://codecov.io/gh/davidcostadev/mymoney)

## Instalation

1. npm install
2. npm run sequelize db:migrate
3. npm run sequelize db:seed #in development

## Development

To use in development environment always run the `npm run sequelize db:migrate` before, and you can
run `npm run dev` to start the server.

## APIs 

[Users](docs/users.md)

## Usage database with dockers 


**database mysql(sugestion)**

```bash
docker run \
    --name db-mymoney \
    -v $PWD/mysql:/var/lib/mysql \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=123 \
    -d mysql
```

**database admin mysql**

```bash
docker run \
    --name admin-mymoney \
    -d --link db-mymoney:db \
    -p 8000:80 \
    -e PMA_HOST="172.17.0.2" \
    phpmyadmin/phpmyadmin
```
