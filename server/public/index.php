<?php

use Slim\Http\Request;
use Slim\Http\Response;

require('../vendor/autoload.php');

$app = new \Slim\App();
$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write('Hello, world!');
});
$app->run();
