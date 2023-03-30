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

# # Define la imagen base
# FROM node:16.13.0 AS build
# # Instala Yarn
# RUN npm install -g yarn
# # Define el directorio de trabajo
# WORKDIR /app
# # Copia los archivos del proyecto al contenedor
# COPY . .
# # Instala las dependencias del proyecto
# RUN yarn install
# # Construye el proyecto con Vite
# RUN yarn build

# # Define una nueva imagen base
# FROM nginx:1.21.3-alpine
# # Copia el archivo de configuración de Nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # Copia los archivos del proyecto construidos con Vite
# COPY --from=build /app/dist /usr/share/nginx/html
# # Expone el puerto 3001
# EXPOSE 3001
# # Inicia Nginx
# CMD ["nginx", "-g", "daemon off;"]
