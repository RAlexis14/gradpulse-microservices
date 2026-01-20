FROM nginx:1.25-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d /etc/nginx/conf.d
COPY nginx/proxy_params /etc/nginx/proxy_params

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
