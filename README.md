# GYANT backend

## Prerequisites

* Node
* Docker

## How to run the project

### Database

1. Cd to the project folder
2. Go to mongodb folder `cd mongodb`
3. Open docker-compose.yml and on `volumes` puth the path to the folder database
4. Create database with `docker-compose up -d`
5. Once the database is running on a docker container run `npm i`
6. Run `node dataSetup` and voilá 

### API

1. Cd back from mongodb folder `cd ..`
2. Check .env file to see if the ports and database host is ok
3. Run `npm run start` to start the application