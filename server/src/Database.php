<?php
namespace Gesticker;

use Gesticker\Entity\Image;
use Gesticker\Entity\Sticker;
use Slim\Http\Request;
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
            return $sticker->format();
        }, iterator_to_array($stickers));
    }

    public static function createStickerFromRequest(Request $request) {
        $body = $request->getParsedBody();

        // TODO: Validate
        // TODO: Save uploaded image: $request->getUploadedFiles();

        $sticker = self::$stickers->create([
            'type' => $body['type'],
            'author' => $body['author'] ? $body['author'] : null,
            'date' => $body['date'] ? new \DateTime($body['date']) : null,
            'lat' => $body['lat'],
            'lng' => $body['lng'],
        ]);

        return $sticker->format();
    }

}
