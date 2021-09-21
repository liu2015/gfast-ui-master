FROM nginx

EXPOSE 80

COPY /dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/

ENTRYPOINT nginx -g "daemon off;"


#docker run -itd -p80:80 nginx 