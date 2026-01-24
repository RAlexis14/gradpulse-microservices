# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install deps first

COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build-time API base URL for Vite
ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config for SPA routing
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
