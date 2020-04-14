FROM node:13

RUN mkdir -p /home/container
WORKDIR /home/container

# we should only re-run npm install if package.json specifically has changed. use docker build cache otherwise
COPY ./package.json /home/container/package.json
RUN npm i

# copy everything else over
COPY . /home/container

CMD [ "node", "server.js" ]
