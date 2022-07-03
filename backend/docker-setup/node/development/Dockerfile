FROM node:16

# Create app directory
WORKDIR /backend

RUN apt-get update && apt-get install -y vim

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm i --location=global nodemon

# Copy source directory
COPY . .

CMD [ "nodemon" ]
