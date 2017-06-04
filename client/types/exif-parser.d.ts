declare module 'exif-parser' {

    interface ExifParserStatic {
        create(buffer: ArrayBuffer): Parser;
    }

    interface Parser {
        enableBinaryFields(enable: boolean): this;
        enablePointers(enable: boolean): this;
        enableTagNames(enable: boolean): this;
        enableImageSize(enable: boolean): this;
        enableReturnTags(enable: boolean): this;
        enableSimpleValues(enable: boolean): this;

        parse(): ExifResult;
    }

    interface ExifResult {
        startMarker: any;
        tags: any;
        imageSize: any;
        thumbnailOffset: any;
        thumbnailLength: any;
        thumbnailType: any;
        app1Offset: any;
    }

    const ExifParser: ExifParserStatic;
    export default ExifParser;

}
