import ExifParser from 'exif-parser';

function getArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            resolve(this.result);
        };
        fileReader.readAsArrayBuffer(file);
    });
}

export async function getImageTags(image: File) {
    const arrayBuffer = await getArrayBuffer(image);
    const parser = ExifParser.create(arrayBuffer);
    return parser.parse();
}

export async function getUsefulImageData(image: File) {
    const { tags } = await getImageTags(image);

    return {
        author: tags.Artist ? tags.Artist : null,
        createDate: tags.CreateDate ? new Date(tags.CreateDate * 1000) : null,
        coords: tags.GPSLatitude ? {
            lat: tags.GPSLatitude,
            lng: tags.GPSLongitude,
        } : null,
    };
}
