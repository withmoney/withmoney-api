# MyMoney

It is a project of money control

## Instalation

1. npm install
2. npm run sequelize db:migrate
3. npm run sequelize db:seed #in development

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
