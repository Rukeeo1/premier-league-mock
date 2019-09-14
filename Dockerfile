FROM node:10

WORKDIR /usr/src/dnt

COPY package.json /usr/src/dnt

RUN yarn

COPY . /usr/src/dnt



ENV NODE_ENV=DOCKER


EXPOSE 6060


CMD ["yarn", "start"]

# CMD ["/bin/bash"]