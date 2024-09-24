# Dockerfile details
**Set base image**
 * `FROM <image name>`
 
**Set/create working directory inside container so our files dont conflict with container root files**
 * `WORKDIR /usr/app`

**Copy files from workspace to container WORKDIR directory specified earlier**
  * `COPY ./yourWorkspaceFilesPath ./containerWorkspaceFilesPath`
  * `COPY --from=<faze name> ./yourWorkspaceFilesPath ./containerWorkspaceFilesPath` - copy files from another "step" in dockerfile

 # Building and tagging an image;
 * Create dockerfile
 * `docker build -t -f <dockerfile name> <image name> ./`
    * -f - specify dockerfile(dev, prod)
    * -t - tag an image
    * for an image tag use convention userid:reponame:version

 # Creating and running containers:
 **Create and start a container**
 * `docker run -a -it -p <port_outside_container>:<port_inside_container> -v /<workdir>/node_modules -v $(pwd):<workdir>  <image name> sh`
    * -v - specify path to workdir/node_modules inside container to exclude it and then specify path to reference other files and use volumes
    * -p - map port
    * -a - watch for output from docker container;
    * -it - allow user input inside container;
    * sh - gives access to terminal inside a container;

**Create container**
 * `docker create <image name>` 

 **Start container**
 * `docker start <container id>`

# Executing commands inside container
**Execute command inside container**
* docker exec -it <container id> <command> sh 
    * -a - watch for output from docker container;
    * -it - allow user input inside container;
    * sh - gives access to terminal inside a containe;

 # Stoping containers
 **Stop container**
 * `docker stop <container id>`

 **Kill container**
 * `docker kill <container id>`

 # Logging commands
 **Log all containers**
 * `docker ps -all`

**See logs inside container for debugging**
 * `docker logs <container id>`

# Docker-compose
 **Base example of docker-compose.yml file** 

 ```javascript
version: '3' - version of docker-compose cli
   services: - containers we wanna start
      redis-service: - specify name/tag of container
         image: redis - specify base image
      node-service: - specify name/tag of container
         build: . - specify path to dockerfile to build an image
         build: - other way to build
           context: . - specify root directory
           dockerfile: dockerfile.dev - specify docker file
         restart: always - specify restart container policy
         ports: 
            - "8081:8081"
            - "4001:8080"
         volumes: 
            - /app/node_modules
            - .:/app
```
**Start containers with docker compose**
   * `docker-compose up --build`
      * --build - rebuild images

**Stop all running containers with docker compose**
   * `docker-compose down`

**Log docker-compose containers**
   * `docker-compose ps`