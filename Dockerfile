FROM node:13

# WORKDIR create the directory and then execute cd
WORKDIR /home/container

COPY ./package.json .
RUN npm i

COPY . .
