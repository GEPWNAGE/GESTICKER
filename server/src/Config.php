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
            ],

            'database' => [
                'driver' => 'pdo_sqlite',
                'user' => '',
                'password' => '',
                'path' => __DIR__ . '/../data/db.sqlite',
            ],
        ];
    }

}
