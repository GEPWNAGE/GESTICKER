<?php
namespace Gesticker;

use Gesticker\Entity\Image;
use Gesticker\Entity\Sticker;
use Spot\Locator;

class Database {

    public static $spot;

    public static function init() {
        $config = new \Spot\Config();
        $config->addConnection('db', App::$config['database']);
        self::$spot = new Locator($config);

        self::$spot->mapper(Sticker::class)->migrate();
        self::$spot->mapper(Image::class)->migrate();
    }

}
