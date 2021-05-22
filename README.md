# spring-xmpp-websocket-reactjs

## Getting started

1. Run Spring Boot App
2. Run ReactJS App

```shell
npm install
npm start
```

## Start XMPP Server

MySQL server:

```
docker run --name openfire-mysql -e MYSQL_RANDOM_ROOT_PASSWORD=yes -e MYSQL_DATABASE=openfire -e MYSQL_USER=openfireuser -e MYSQL_PASSWORD=openfirepasswd -d mysql/mysql-server:8.0.23
```

OpenFire XMPP server:

```
docker run -d -p 9090:9090 -p 5222:5222 -p 5269:5269 -p 5223:5223 -p 7443:7443 -p 7777:7777 -p 7070:7070 -p 5229:5229 -p 5275:5275 --link openfire-mysql:db --name openfire quantumobject/docker-openfire
```

Then go to http://localhost:9090/ to configure the XMPP server.
