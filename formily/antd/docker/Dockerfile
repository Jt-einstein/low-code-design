FROM nginx:1.21-alpine
MAINTAINER manana-care

RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
EXPOSE 80/tcp
COPY build/  /var/www/frontend/low-code/
