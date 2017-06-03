<?php
namespace Stickers;

use Slim\Http\Request;
use Slim\Http\Response;

class App {

    static function run() {
        $app = new \Slim\App();
        $app->get('/', function (Request $request, Response $response) {
            $response->getBody()->write('Hello, world!');
        });
        $app->run();
    }

}
