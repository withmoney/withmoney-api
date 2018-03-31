# mymoney


# usage

docker run \
    --name db-mymoney \
    -v $PWD/mysql:/var/lib/mysql \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=123 \
    -d mysql

docker run \
    --name admin-mynomey \
    -d --link db-mymoney:db \
    -p 8000:80 \
    -e PMA_HOST="172.17.0.2" \
    phpmyadmin/phpmyadmin