<?php
namespace Gesticker;

use Gesticker\Entity\Image;
use Gesticker\Entity\Sticker;
use Psr\Http\Message\UploadedFileInterface;
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

    public static function getSticker($id) {
        $sticker = self::$stickers->get($id);
        return $sticker ? $sticker->format() : null;
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

        $image = self::handleImageUpload($request);

        $sticker = self::$stickers->create([
            'type' => $body['type'],
            'author' => $body['author'] ? $body['author'] : null,
            'date' => $body['date'] ? new \DateTime($body['date']) : null,
            'lat' => $body['lat'],
            'lng' => $body['lng'],
        ]);

        $image->stickerId = $sticker->id;
        self::$images->save($image);

        return $sticker->format();
    }

    /**
     * @param Request $request
     * @return Image
     * @throws \Exception
     */
    public static function handleImageUpload(Request $request) {
        $files = $request->getUploadedFiles();
        if (empty($files['image'])) {
            throw new \Exception('Expected an image');
        }

        /** @var UploadedFileInterface $imageFile */
        $imageFile = $files['image'];
        if ($imageFile->getError() !== UPLOAD_ERR_OK) {
            throw new \Exception('Image upload error: ' . $imageFile->getError());
        }

        $filename = uniqid() . '_' . $imageFile->getClientFilename();
        $imageFile->moveTo(App::$config['uploads']['path'] . '/' . $filename);

        return self::$images->build([
            'filename' => $filename,
            'originalFilename' => $imageFile->getClientFilename(),
        ]);
    }

}
