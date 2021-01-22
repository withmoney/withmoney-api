# withmoney - api

## Requirements

1. `yarn`
2. `node@12`
3. `docker`
4. `docker-compose`

## Installation

1. `yarn`
2. `cp .env.example .env`

## Using for development

`yarn dev`

## Using docker-compose

`docker-compose up -d`

## Using email

If you got this error `Email envs are not defined` that's mean that you need to use some smtp
server, we suggest use the https://mailtrap.io

## database migration

## generating new migration

yarn migrate:save
yarn migrate:up // to apply

### first time

1. `yarn migrate:up`

## Using the queries

https://www.notion.so/withmoney-server-4141ff4995d94d5ebb6f1350be727723
