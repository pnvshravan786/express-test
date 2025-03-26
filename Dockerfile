FROM node:20-alpine

WORKDIR /server

COPY package*.json .

RUN npm i

COPY . .

# Install curl inside the container
RUN apk add --no-cache curl

EXPOSE 3000

CMD ["npm", "start"]