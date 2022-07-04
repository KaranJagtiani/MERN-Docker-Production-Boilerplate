FROM nginx:1.23.0

RUN rm /etc/nginx/conf.d/*

COPY ./mern-template.conf /etc/nginx/conf.d/

RUN apt-get update && apt-get install -y certbot python3-certbot-nginx vim

RUN mkdir /etc/nginx/logs

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
