FROM php:8.2-apache

# Extensions MySQL
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Copie tout le projet dans le dossier web Apache
COPY . /var/www/html/

EXPOSE 80
