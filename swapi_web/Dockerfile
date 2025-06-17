# Step 1: Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run webapp:prod --
 
# Production Stage
FROM nginx:stable-alpine AS production

COPY --from=build /app/build/resources/main/static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]