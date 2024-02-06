const axios = require('axios');
const { contextParser } = require('./helpers');

const apiKey = 'AIzaSyDr8-rjSp3zwVnGYPYKufyS_666VQ2owKg';
const searchEngineID = '9050d544f387f4f2c';

const searchImages = async (query, apiKey, cx, num) => {
    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                q: query,
                searchType: 'image',
                key: apiKey,
                cx: cx,
                num: num
            }
        });

        const imageURLS = response.data.items.map(item => item.link)
        return imageURLS;
    } catch (err) {
        console.log('Error searching images', err.message);
        return [];
    }
}

module.exports.img = async (sock, data, query) => {
    if (!query) {
        await sock.sendMessage(data.key.remoteJid, {
            text: '_*Image of what? Tch*_',
            contextInfo: contextParser(data)
        });
        return;
    }
    const patternForNum = /\b(d+)\b/g;
    const matches = patternForNum.exec(query);

    let num;
    if (!matches) {
        num = 3;
    } else {
        num = Math.min(20, parseInt(matches[1]));
        query = query.replace(matches[1], '');
    }

    searchImages(query, apiKey, searchEngineID, num)
        .then(async imageURLS => {
            let length = imageURLS.length;
            if (length < 1) {
                await sock.sendMessage(data.key.remoteJid, {
                    text: '_Nothing found_',
                    contextInfo: contextParser(data)
                });
            }

            await sock.sendMessage(data.key.remoteJid, {
                text: `_Downloading ${length} images of ${query}_`,
                contextInfo: contextParser(data)
            });

            imageURLS.forEach(async imageURL => {
                await sock.sendMessage(data.key.remoteJid, {
                    image: {
                        url: imageURL
                    },
                    contextInfo: contextParser(data)
                });
            })
        })

}