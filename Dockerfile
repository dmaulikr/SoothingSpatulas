FROM node:alpine

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN apk update && apk add libc6-compat && apk add ffmpeg && apk add --no-cache git && apk add yarn

RUN yarn
RUN yarn global add grunt-cli knex
CMD [ "yarn", "start" ]

EXPOSE 8000 3000