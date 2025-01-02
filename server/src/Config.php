<?php
namespace Gesticker;

class Config {

    /**
     * @param string $env
     * @return array
     */
    static function create($env) {
        return [
            'container' => [
                'settings' => [
                    'displayErrorDetails' => ($env === 'development'),
                ],
            ],

            'view' => [
                // TODO: Set cache path in production env
                'cache' => false,
            ],

            'assets' => [
                'script' => $env === 'development'
                    ? 'http://localhost:8080/build/bundle.js'
                    : '/build/bundle.js',
                'style' => $env === 'development'
                    ? false
                    : '/build/main.css',
            ],

            'database' => [
                'driver' => getenv('DATABASE_DRIVER'),
                'user' => getenv('DATABASE_USER'),
                'password' => getenv('DATABASE_PASSWORD'),
                'dbname' => getenv('DATABASE_DATABASE'),
                'host' => getenv('DATABASE_HOST'),
                'port' => getenv('DATABASE_PORT'),
                'path' => self::fixPath(getenv('DATABASE_PATH')),
            ],

            'uploads' => [
                'path' => self::fixPath(getenv('UPLOADS_PATH')),
            ],
        ];
    }

    public static function fixPath(string $path) {
        return str_replace('__SERVER__', __DIR__ . '/..', $path);
    }

}
