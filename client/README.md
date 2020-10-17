# Barebones React App Starter Kit

### Leverages Webpack & Tailwind CSS

```
$ npx degit https://github.com/tim-corley/react-app-starter.git\#master new-app-dir
$ git init
$ npm install
$ npm run start
```

To create tunnel to expose public URL (while dev server is up - in this case at post 8080):

```
./ngrok http 8080 -host-header="localhost:8080"
```

Docker Notes
 - Create image from Dockerfile:
  `sudo docker build -t react-app-starter:dev .`
 - Create & run docker container from image (be sure to execute this from project root so that hot-reloading - via volume mounting - works):
```
➜  react-app-starter git:(master) ✗ sudo docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 8081:8081 \
-e CHOKIDAR_USEPOLLING=true \
react-app-starter:dev
```
[Further Reading](https://www.bogotobogo.com/DevOps/Docker/Docker-React-App.php)

TODO:

- [ ] add configuration for jest
