module.exports.contextParser = data => {
    return {
        stanzaId: data.key.id,
        participant: data.key.participant,
        quotedMessage: {
            conversation: data.text,
        }
    }
}

module.exports.getTitle = msg => {
    if (msg.hasOwnProperty("message")) {
        if (msg.message.hasOwnProperty("extendedTextMessage")) {
            return msg.message.extendedTextMessage.text;
        } else if (msg.message.hasOwnProperty("conversation")) {
            return msg.message.conversation;
        } else if (
            msg.message.hasOwnProperty("imageMessage") &&
            msg.message.imageMessage.hasOwnProperty("caption")
        ) {
            return msg.message.imageMessage.caption;
        } else if (
            msg.message.hasOwnProperty("videoMessage") &&
            msg.message.videoMessage.hasOwnProperty("caption")
        ) {
            return msg.message.videoMessage.caption;
        } else {
            return null;
        }
    }
};