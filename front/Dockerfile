FROM node:21.6.2


ENV NODE_ENV=development

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

# Run the app in development mode or production mode

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "5173"]

# Make port 5173 available to the world outside this container


EXPOSE 5173
