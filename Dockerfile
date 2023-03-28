# FROM node:lts-bullseye as build
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# RUN yarn build

# FROM nginx:alpine
# ADD ./config/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /var/www/app/
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3001

CMD [ "yarn", "preview" ]
