# Set up backend using PHP
FROM php:7.4 AS php-build

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app
COPY server /app/server

RUN cd /app/server && composer install --no-dev

# Set up PHP FPM
FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql

COPY --from=php-build /app/server /app/server

RUN touch /app/server/.env

# Copy the php config file
COPY ./php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf