FROM node:16-slim

# Create app directory
WORKDIR /frontend

# Install app dependencies
COPY package.json yarn.lock ./

COPY . .

RUN yarn install

ENV NODE_ENV=development

CMD [ "yarn", "start" ]
