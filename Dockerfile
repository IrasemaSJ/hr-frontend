FROM node:19-alpine3.16 as build
WORKDIR /app

COPY package.json ./
RUN yarn install --legacy-peer-deps --silent
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]