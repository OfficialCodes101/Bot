const { contextParser, isAdmin } = require('./helpers')

module.exports.kick = async (sock, data, str) => {
    // if (str === 'all') {
    //     const metadata = await sock.groupMetadata(data.key.remoteJid);
    // }

    let botIsAdmin = await isAdmin(sock, data.key.remoteJid, sock.user.id);
    if (!botIsAdmin) {
        await sock.sendMessage(data.key.remoteJid, {
            text: '_I\'m not admin, fool_',
        });
        return;
    }
    const toBeKicked = [];
    let mentionedJIDs = data?.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (mentionedJIDs) {
        mentionedJIDs.forEach(item => {
            toBeKicked.push(item);
        });
    }
    let quotedJID = data?.message?.extendedTextMessage?.contextInfo?.participant;
    if (quotedJID) {
        toBeKicked.push(quotedJID);
    }

    if (!toBeKicked) {
        await sock.sendMessage(data.key.remoteJid, {
            text: '_You expect me to kick the air right?_',
            contextInfo: contextParser(data)
        });
        return;
    }

    let results = await sock.groupParticipantsUpdate(data.key.remoteJid, toBeKicked, 'remove');
    let success = results.every(item => {
        item.status === '200'
    });

    if (!success) {
        await sock.sendMessage(data.key.remoteJid, {
            text: '_One or more people could not be kicked_'
        });
    }
}