import ExifParser from 'exif-parser';
import { Coords } from '../types';

function getArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            resolve(this.result as ArrayBuffer);
        };
        fileReader.readAsArrayBuffer(file);
    });
}

export async function getImageTags(image: File) {
    const arrayBuffer = await getArrayBuffer(image);
    const parser = ExifParser.create(arrayBuffer);
    return parser.parse();
}

interface ImageData {
    author?: string;
    createDate?: Date;
    coords?: Coords;
}

export async function getUsefulImageData(image: File): Promise<ImageData> {
    const { tags } = await getImageTags(image);

    return {
        author: tags.Artist ? tags.Artist : null,
        createDate: tags.CreateDate ? new Date(tags.CreateDate * 1000) : null,
        coords: tags.GPSLatitude ? [tags.GPSLongitude, tags.GPSLatitude] : null,
    };
}
