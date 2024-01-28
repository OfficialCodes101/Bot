module.exports.spam = async (sock, data, str) => {
    if (!str) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "_Usage: .spam MESSAGE_",
            contextInfo: contextParser(data),
        });
        return;
    }

    let mentions = null;
    try {
        mentions = data.message.extendedTextMessage.contextInfo.mentionedJid;
    } catch (err) {
        console.log(err.message);
    }
    for (let i = 0; i < 10; i++) {
        await sock.sendMessage(data.key.remoteJid, {
            text: str,
            mentions: mentions
        });
    }
};