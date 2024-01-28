module.exports.promoteOrDemote = async (sock, data, str, choice) => {
    let response = null;
    if (!str) {
        try {
            let toBeMoted = data.message.extendedTextMessage.contextInfo.participant;
            response = await sock.groupParticipantsUpdate(data.key.remoteJid, [toBeMoted], choice);
        } catch (err) {
            message = await sock.sendMessage(data.key.remoteJid, {
                text: 'Reply to a message or tag someone, idiot'
            })
            console.log(err.message);
        }
        return;
    }

    if (response) {
        return;
    }

    try {
        mentionedJIDs = data.message.extendedTextMessage.contextInfo.mentionedJid;
        response = await sock.groupParticipantsUpdate(data.key.remoteJid, mentionedJIDs, choice);
    } catch (err) {
        console.log(err.message);
    }

    if (!response) {
        await sock.sendMessage(data.key.remoteJid, {
            text: 'Couldn\'t promote, for some reason, I blame blake',
        })
    }


}