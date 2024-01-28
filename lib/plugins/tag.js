const { contextParser } = require('./helpers');

module.exports.tag = async (sock, data, options) => {
    const metadata = await sock.groupMetadata(data.key.remoteJid);
    const participantsIDs = metadata.participants.map(participant => {
        return participant.id;
    });

    if (!options) {
        await sock.sendMessage(data.key.remoteJid, {
            text: 'Can\'t tag them for no reason now can I',
            contextInfo: contextParser(data)
        });
        return;
    }
    
    if (options === 'all') {
        const participants = participantsIDs.map(participant => {
            let personIDRemade = '';
            for (let i = 0; i < participant.length; i++) {
                if (!isNaN(parseInt(participant[i])) && isFinite(participant[i])) {
                    personIDRemade += participant[i];
                }
            }
            return '@' + personIDRemade;
        });
        let message = participants.join('\n');
        await sock.sendMessage(data.key.remoteJid, {
            text: message,
            mentions: participantsIDs
        });
    } else {
        const context = contextParser(data);
        context.mentionedJid = participantsIDs;
        await sock.sendMessage(data.key.remoteJid, {
            text: options,
            contextInfo: context
        })
    }
    
}