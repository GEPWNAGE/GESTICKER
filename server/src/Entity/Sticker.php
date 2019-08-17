<?php
namespace Gesticker\Entity;

use Spot\Entity;
use Spot\EntityInterface;
use Spot\EventEmitter;
use Spot\Mapper;
use Spot\MapperInterface;

class Sticker extends Entity {

    protected static $table = 'stickers';

    public static function fields() {
        return [
            'id' => ['type' => 'integer', 'primary' => true, 'autoincrement' => true],
            'type' => ['type' => 'string', 'required' => true],
            'author' => ['type' => 'string', 'required' => false],
            'date' => ['type' => 'date', 'required' => false],
            'lat' => ['type' => 'float', 'required' => true],
            'lng' => ['type' => 'float', 'required' => true],

            'createdDate' => ['type' => 'datetime', 'required' => true],
        ];
    }

    public static function relations(MapperInterface $mapper, EntityInterface $entity) {
        return [
            'image' => $mapper->hasOne($entity, Image::class, 'stickerId'),
        ];
    }

    public static function events(EventEmitter $eventEmitter) {
        $eventEmitter->on('beforeSave', function (Sticker $entity, Mapper $mapper) {
            if (!$entity->createdDate) {
                $entity->createdDate = new \DateTime();
            }
        });
    }

    public function format() {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'author' => $this->author,
            'date' => $this->date ? $this->date->format('Y-m-d') : null,
            'coords' => [
                $this->lng,
                $this->lat,
            ],
            'image' => [
                'filename' => $this->image->filename,
            ],
        ];
    }

}
