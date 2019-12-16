FROM node:latest

WORKDIR /src

# COPY package.json .

COPY /node_modules .

# RUN yarn install

COPY . .

CMD [ "yarn", "start" ]