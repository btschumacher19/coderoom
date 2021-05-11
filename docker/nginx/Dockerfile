# The first stage
# Build React static files
FROM node:13.12.0-alpine as build

WORKDIR /app/coderoom-frontend
COPY ./coderoom-frontend/package.json ./
COPY ./coderoom-frontend/package-lock.json ./
RUN npm ci --silent
COPY ./coderoom-frontend/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/coderoom-frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]