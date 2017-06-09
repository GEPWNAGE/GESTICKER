<?php
use Gesticker\App;

require('../vendor/autoload.php');

$dotenv = new \Dotenv\Dotenv(realpath(__DIR__ . '/../'));
$dotenv->load();

$env = getenv('environment') ?? 'development';

ini_set('display_errors', $env === 'development' ? E_ALL : 0);

new App($env);
