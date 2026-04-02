FROM php:8.2-apache

# Enable required PHP extensions and Apache modules.
RUN docker-php-ext-install pdo pdo_mysql \
    && a2enmod rewrite

# Serve the PHP API folder as the web root.
COPY docker/apache-vhost.conf /etc/apache2/sites-available/000-default.conf

# Copy repository files (api + front used by the API).
COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
