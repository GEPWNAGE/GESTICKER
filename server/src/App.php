<?php
namespace Stickers;

use Slim\Http\Request;
use Slim\Http\Response;

class App {

    protected $config = [
        'container' => [
            'settings' => [
                'displayErrorDetails' => true,
            ],
        ],

        'view' => [
            // TODO: Set cache path in production env
            'cache' => false,
        ],
    ];

    protected $app;

    function __construct() {
        $container = new \Slim\Container($this->config['container']);
        $this->app = new \Slim\App($container);

        $this->configure();
        $this->applyRoutes();

        $this->app->run();
    }

    protected function configure() {
        $container = $this->app->getContainer();

        $container['view'] = function ($container) {
            $view = new \Slim\Views\Twig(__DIR__ . '/views', $this->config['view']);

            // Instantiate and add Slim specific extension
            $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
            $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));

            return $view;
        };
    }

    protected function applyRoutes() {
        $app = $this->app;

        $app->get('/', function (Request $request, Response $response) {
            return $this->view->render($response, 'index.twig', [
                'assets' => [
                    'script' => '/build/bundle.js',
                ],
            ]);
        });
    }

}
