<?php
namespace Gesticker\Entity;

use Spot\Entity;
use Spot\EntityInterface;
use Spot\MapperInterface;

class Image extends Entity {

    protected static $table = 'images';

    public static function fields() {
        return [
            'id' => ['type' => 'integer', 'primary' => true, 'autoincrement' => true],
            'stickerId' => ['type' => 'integer', 'required' => true],
            'filename' => ['type' => 'string', 'required' => true],
            'originalFilename' => ['type' => 'string', 'required' => true],
        ];
    }

    public static function relations(MapperInterface $mapper, EntityInterface $entity) {
        return [
            'sticker' => $mapper->belongsTo($entity, Sticker::class, 'stickerId'),
        ];
    }

}
