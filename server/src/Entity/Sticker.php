<?php
namespace Gesticker\Entity;

use Spot\Entity;
use Spot\EntityInterface;
use Spot\MapperInterface;

class Sticker extends Entity {

    protected static $table = 'stickers';

    public static function fields() {
        return [
            'id' => ['type' => 'integer', 'primary' => true, 'autoincrement' => true],
        ];
    }

    public static function relations(MapperInterface $mapper, EntityInterface $entity) {
        return [
            'image' => $mapper->hasOne($entity, Image::class, 'stickerId'),
        ];
    }

}
