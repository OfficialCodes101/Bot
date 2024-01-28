const { contextParser } = require('./helpers');

module.exports.lyrics = async (sock, data, query) => {
    if (!query) {
        sock.sendMessage(data.key.remoteJid, {
            text: '_Usage: .lyrics *SONG; ARTIST*_',
            contextInfo: contextParser(data)
        });
        return;
    }
    const pattern = /^([^;]+)$/g;
    const matches = pattern.exec(query);

    // console.log(matches);

    const songName = matches[1];
    const songs = await AZLyrics.search(songName);
    
    console.log(songs)
    if (songs.length < 1) {
        await sock.sendMessage(data.key.remoteJid, {
            text: `Lyrics not found`,
            contextInfo: contextParser(data)
        })
        return;
    }

    const { title, actualLyrics } = await AZLyrics.getTrack(songs[0].url);
    await sock.sendMessage(data.key.remoteJid, {
        text: `Lyrics of ${title} found`,
        contextInfo: contextParser(data)
    })
    await sock.sendMessage(data.key.remoteJid, {
        text: actualLyrics,
        contextInfo: contextParser(data)
    })
    /*
    const options = {
        q_track: songName,
        q_artist: songArtist,
        s_track_rating: 'desc'
    }

    m.searchTrack(options)
        .then(async dataa => {
            if (dataa.message.body.track_list.length > 0) {
                const track = dataa.message.body.track_list[0].track;
                const trackID = track.track_id;
                const trackName = track.track_name;
                console.log(`Song _${trackName}_ found`)
                await sock.sendMessage(data.key.remoteJid, {
                    text: `Song _${trackName}_ found`,
                    contextInfo: contextParser(data)
                });
                return m.getTrackLyrics(trackID);
            } else {
                console.log('No lyrics found');
                await sock.sendMessage(data.key.remoteJid, {
                    text: 'Not found',
                    contextInfo: contextParser(data)
                })
            } 
        })
        .then(async dataa => {
            if (dataa.message.body.lyrics) {
                const lyrics = dataa.message.body.lyrics.lyrics_body;
                await sock.sendMessage(data.key.remoteJid, {
                    text: lyrics,
                    contextInfo: contextParser(data)
                });
            } else {
                console.log('Lyrics not found');
                await sock.sendMessage(data.key.remoteJid, {
                    text: 'Lyrics not found',
                    contextInfo: contextParser(data)
                })
            }
        });
    */

    /*

    const searchQuery = `${base}track.search?q_track=${songName}&q_artist=${songArtist}&apikey=${ACCESSTOKEN}`;

    (async () => {
        try {
            const trackSearchResponse = await axios.get(searchQuery);
            if (trackSearchResponse.status !== 200) {
                console.log('Something went wrong with searching');
                return;
            }

            const trackSearchData = trackSearchResponse.data;
            console.log(trackSearchData)
            if (trackSearchData.message.body.track_list.length === 0) {
                console.log('Track not found');
                sock.sendMessage(data.key.remoteJid, {
                    text: 'Song not found',
                    contextInfo: contextParser(data)
                });
                return;
            }

            const trackID = trackSearchData.message.body.track_list[0].track.track_id;
            
            const lyricsQuery = `${base}track.lyrics.get?track_id=${trackID}&apikey=${ACCESSTOKEN}`;
            const lyricsResponse = await axios.get(lyricsQuery);

            if (lyricsResponse.status !== 200) {
                console.log('Something went wrong with lyrics');
                return;
            }
            const lyricsData = lyricsResponse.data;
            console.log(lyricsData);

            if (!lyricsData.message.body.lyrics) {
                console.log('No lyrics found');
                sock.sendMessage(data.key.remoteJid, {
                    text: 'Lyrics not found',
                    contextInfo: contextParser(data)
                });
                return;
            }

            const actualLyrics = lyricsData.message.body.lyrics.lyrics_body;
            await sock.sendMessage(data.key.remoteJid, {
                text: actualLyrics,
                contextInfo: contextParser(data)
            })

        } catch (err) {
            console.log(err.message)
        }
    })();
    */

    /*
    try {
        const response = await axios.post(`${base}/track.search`, {
            apikey: ACCESSTOKEN,
            q_track: songName,
            q_artist: songArtist
        });
        const searchResults = response.data;
        console.log(searchResults);
    } catch (err) {
        console.log(err.message);
        return;
    }
    */
    
};