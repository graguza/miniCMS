FROM johnpapa/angular-cli as build-env
WORKDIR /app
RUN ls 
ARG env=stage
ARG ver=master
COPY . .
RUN ls
RUN npm install
RUN ng build 

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=build-env /app/dist/frontend .