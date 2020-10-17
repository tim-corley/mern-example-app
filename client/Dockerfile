FROM node:14-alpine

WORKDIR /app

COPY package*.json /app/

ENV PATH /app/node_modules/ .bin:$PATH

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "start"]