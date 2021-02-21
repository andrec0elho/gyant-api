# GYANT backend

## Prerequisites

* Node
* Docker

## How to run the project

### Database

1. Cd to the project folder
2. Go to mongodb folder `cd mongodb`
3. Run `mkdir database`
4. Open `mongodb/docker-compose.yml` and on `volumes` put the path to the folder database
5. Create the database with `docker-compose up -d`
6. Once the database is running on a docker container run `npm i`
7. Run `node dataSetup` and voilá 

### API

1. Cd back from mongodb folder `cd ..`
2. Check .env file to see if the ports and database host is ok
3. Run `npm i`
4. Run `npm run start` to start the application