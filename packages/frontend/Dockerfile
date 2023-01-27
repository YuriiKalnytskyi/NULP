# build app
FROM node:buster AS build

WORKDIR /app

COPY package.json ./
COPY src ./src
COPY public ./public

RUN npm install && npm run build

# run static server for app
FROM node:buster AS run

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install --global --unsafe-perm serve

EXPOSE $PORT

CMD ["serve", "--no-clipboard", "--single", "build"]
