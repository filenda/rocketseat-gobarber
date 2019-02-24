commands

# to initialize the sequelize structure

npx sequelize init

# to create a initial migration

npx sequelize migration:create --name=create-users

# add the db-specific driver for sequelize to connect with

yarn add (pg or mysql2 or )

rename file "config/config.json" to "config/database.js"

# creates a docker container for postgres and makes it redirect its 5432 port to the host machine # #5432 port. "-d" tells docker to run the container on 'detached' mode, that is 'on background'

# '-t' tells docker to use the kartoza/postgis image

docker run --name database -p:5432:5432 -d -t kartoza/postgis

# lists all running containers

docker ps

# runs the migration

npx sequelize db:migrate
