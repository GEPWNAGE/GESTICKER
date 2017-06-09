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
                'driver' => getenv('database_driver'),
                'user' => getenv('database_user'),
                'password' => getenv('database_password'),
                'dbname' => getenv('database_database'),
                'host' => getenv('database_host'),
                'port' => getenv('database_port'),
                'path' => str_replace('__DIR__', __DIR__, getenv('database_path')),
            ],
        ];
    }

}
