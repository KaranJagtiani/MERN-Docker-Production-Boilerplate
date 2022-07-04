FROM node:16-alpine

# Create app directory
WORKDIR /frontend

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV NODE_ENV=development

CMD [ "yarn", "start" ]
