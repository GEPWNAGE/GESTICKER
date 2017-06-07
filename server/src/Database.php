<?php
namespace Gesticker;

use Gesticker\Entity\Image;
use Gesticker\Entity\Sticker;
use Spot\Locator;

class Database {

    /** @var \Spot\Locator */
    public static $spot;

    /** @var \Spot\Mapper */
    public static $stickers;

    /** @var \Spot\Mapper */
    public static $images;

    public static function init() {
        $config = new \Spot\Config();
        $config->addConnection('db', App::$config['database']);
        self::$spot = new Locator($config);

        self::$stickers = self::$spot->mapper(Sticker::class);
        self::$images = self::$spot->mapper(Image::class);

        self::$stickers->migrate();
        self::$images->migrate();
    }

    public static function getStickers() {
        $stickers = self::$stickers->all();
        return array_map(function (Sticker $sticker) {
            return [
                'id' => $sticker->id,
                'type' => $sticker->type,
                'date' => $sticker->date->format('Y-m-d'),
                'coords' => [
                    'lat' => $sticker->lat,
                    'lng' => $sticker->lng,
                ],
            ];
        }, iterator_to_array($stickers));
    }

    public static function createSticker() {
        $sticker = self::$stickers->create([
            'type' => 'placed',
            'date' => new \DateTime(),
            'lat' => 51.4473811 + (mt_rand(0, mt_getrandmax() - 1) / mt_getrandmax() * 2) - 1,
            'lng' => 5.4877141 + (mt_rand(0, mt_getrandmax() - 1) / mt_getrandmax() * 2) - 1,
        ]);

        return $sticker;
    }

}
