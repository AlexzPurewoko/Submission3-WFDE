/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, './src/public/herotemp');
const destination = path.resolve(__dirname, './src/public/images/heros');

if(!fs.existsSync(destination)){
    fs.mkdirSync(destination);
}
console.log(fs.readdirSync(target));
fs.readdirSync(target).forEach((image) => {
    console.log(image);
    // for w400
    sharp(`${target}/${image}`)
        .resize({width: 400})
        .webp({ quality: 50 })
        .toFile(
            path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-small.webp`)
        );

    // for h 306px
    sharp(`${target}/${image}`)
        .resize({height: 306})
        .webp({ quality: 50 })
        .toFile(
            path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-medium.webp`)
        );

    // for h 380px
    sharp(`${target}/${image}`)
        .resize({height: 380})
        .webp({ quality: 50 })
        .toFile(
            path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-large.webp`)
        );

    // for h 450px
    sharp(`${target}/${image}`)
        .resize({height: 450})
        .webp({ quality: 50 })
        .toFile(
            path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-extra.webp`)
        );
});