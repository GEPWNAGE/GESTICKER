<?php
use Gesticker\App;

require('../vendor/autoload.php');

$dotenv = new \Dotenv\Dotenv(realpath(__DIR__ . '/../'));
$dotenv->load();

new App(getenv('environment') ?? 'development');
