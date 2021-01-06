FROM node:9-slim

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]