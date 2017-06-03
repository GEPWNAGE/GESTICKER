<?php
namespace Stickers;

use Slim\Http\Request;
use Slim\Http\Response;

class App {

    protected $config;
    protected $app;

    function __construct() {
        $this->config = Config::create('development');
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
        $config = $this->config;

        $app->get('/', function (Request $request, Response $response) use ($config) {
            return $this->view->render($response, 'index.twig', [
                'assets' => $config['assets'],
            ]);
        });
    }

}
