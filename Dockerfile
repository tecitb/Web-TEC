FROM php:7.2-apache
RUN a2enmod rewrite
COPY . /var/www/html

MAINTAINER tec_itb@km.itb.ac.id
