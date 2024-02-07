const XRegExp = require('xregexp');
const commands = require('./lib/plugins');
require('dotenv').config();


module.exports.processIncomingMessages = async (sock, messageInfoUpsert) => {
    if (messageInfoUpsert.hasOwnProperty('messages')) {
        for (msg of messageInfoUpsert.messages) {
            let message_array = commands.getTitle(msg);
            if (!message_array) {
                console.log('Not a text message');
                continue;
            }
            message_array = message_array.trim().split(' ');
            /*
            try {
                message_array = msg.message.extendedTextMessage.text.trim().split(' ');
            } catch (error) {
                message_array = msg.message.conversation.trim().split(' ');
            }
            */
            let message = message_array.filter(element => element !== '').join(' ');
            console.log(message);
            
            if (message[0] !== process.env.PREFIX) {
                return;
            }
            const query = message.slice(1).trim();
            const prompt_pattern = /(\w+)(?: ?(.*))?/g;
            const matches = prompt_pattern.exec(query);
        
            if (!matches) {
                if (msg.key.fromMe) {
                    console.log('From me');
                    continue;
                }
                continue;
            }

        
            let command = '';
            try {
                command = matches[1];
            } catch (error) {
                sock.sendMessage(msg.key.remoteJid, {
                    text: 'Request Failed'
                })
            }

            const data = {
                text: message,
                key: msg.key,
                message: msg.message
            }
            
            switch (command.toLowerCase()) {
                case 'greet':
                    await commands.greet(sock, data);
                    continue;
                // case 'spam':
                //     const str = matches[2];
                //     await commands.spam(sock, data, str);
                //     continue;
                case 'lyrics':
                    await commands.lyrics(sock, data, matches[2].trim());
                    continue;
                case 'add':
                    await commands.add(sock, data, matches[2].trim())
                    continue;
                case 'kick':
                    await commands.kick(sock, data, matches[2]);
                    continue;
                case 'promote':
                    await commands.promoteOrDemote(sock, data, matches[2], 'promote');
                    continue;
                case 'demote':
                    await commands.promoteOrDemote(sock, data, matches[2], 'demote');
                    continue;
                case 'mute':
                    await commands.muteUnmute(sock, data, 'announcement');
                    continue;
                case 'unmute':
                    await commands.muteUnmute(sock, data, 'not_announcement');
                    continue;
                case 'tag':
                    await commands.tag(sock, data, matches[2]);
                    continue;
                case 'tagall':
                    await commands.tag(sock, data, 'all');
                    continue;
                case 'img':
                    await commands.img(sock, data, matches[2]);
                    continue;
                default:
                    await sock.sendMessage(data.key.remoteJid, {
                        text: 'Not implemented yet, idiot',
                        contextInfo: commands.contextParser(data)
                    })
            }
            /*
            if (matches) {
                matches.forEach(elem => console.log(elem));
            }
            */
        }
    }

}


