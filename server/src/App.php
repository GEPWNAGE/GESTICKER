<?php
namespace Gesticker;

use Slim\Http\Request;
use Slim\Http\Response;

class App {

    public static $config;
    protected $app;

    function __construct($env) {
        self::$config = Config::create($env);
        $container = new \Slim\Container(self::$config['container']);
        $this->app = new \Slim\App($container);

        $this->configure();
        $this->applyRoutes();

        $this->app->run();
    }

    protected function configure() {
        $container = $this->app->getContainer();

        $container['view'] = function ($container) {
            $view = new \Slim\Views\Twig(__DIR__ . '/views', self::$config['view']);

            // Instantiate and add Slim specific extension
            $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
            $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));

            return $view;
        };

        Database::init();
    }

    protected function applyRoutes() {
        $app = $this->app;

        $app->group('/api', function () {
            $this->get('/stickers', function (Request $request, Response $response) {
                return $response->withJson([
                    'stickers' => Database::getStickers(),
                ]);
            });

            $this->get('/stickers/{id}', function (Request $request, Response $response, $args) {
                return $response->withJson(Database::getSticker($args['id']));
            });

            $this->post('/stickers', function (Request $request, Response $response) {
                try {
                    $sticker = Database::createStickerFromRequest($request);

                    return $response->withJson([
                        'sticker' => $sticker,
                    ]);
                } catch (\Exception $e) {
                    return $response->withJson([
                        'error' => $e->getMessage(),
                    ], 400);
                }

//                // TODO: Validation error handling
//                catch (\Exception $e) {
//                    return $response->withJson([
//                        'error' => 'validation error',
//                    ], 400);
//                }
            });

            // Show error for calls to non-existent API methods
            $this->get('[/{path:.*}]', function (Request $request, Response $response) {
                return $response->withJson([
                    'error' => 'method does not exist',
                ], 400);
            });
        });

        // Direct all requests to React entry point
        $app->get('[/{path:.*}]', function (Request $request, Response $response) {
            return $this->view->render($response, 'index.twig', [
                'assets' => App::$config['assets'],
            ]);
        });
    }

}
