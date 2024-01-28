module.exports.greet = async (sock, data) => {
    let mentions = null;
    try {
        mentions = data.message.extendedTextMessage.contextInfo.mentionedJid;
    } catch (err) {
        console.log(err.message);
    }
    
    await sock.sendMessage(msg.key.remoteJid, {
        text: "Hello Bitches",
        mentions: mentions,
    });
};