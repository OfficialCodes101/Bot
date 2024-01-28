const { contextParser } = require('./helpers')

module.exports.kick = async (sock, data, str) => {
    let removed = false;

    if (str === 'all') {
        const metadata = await sock.groupMetadata(data.key.remoteJid);
        
        console.log(metadata);
    }


    if (!str) {
        try {
            let quotedJID = data.message.extendedTextMessage.contextInfo.participant;
            await sock.groupParticipantsUpdate(data.key.remoteJid, [quotedJID], 'remove');
            removed = true;
        } catch (err) {
            console.log(err.message);
        }
    }

    if (removed === true) {
        return;
    }

    let mentionedJIDs = [];
    try {
        mentionedJIDs = data.message.extendedTextMessage.contextInfo.mentionedJid;
        await sock.groupParticipantsUpdate(data.key.remoteJid, mentionedJIDs, 'remove');
        removed = true;
    } catch (err) {
        console.log(err.message);
    }

    if (removed === false) {
        await sock.sendMessage(data.key.remoteJid, {
            text: '_Example: .kick @Blake_',
            contextInfo: contextParser(data)
        });
    }

}