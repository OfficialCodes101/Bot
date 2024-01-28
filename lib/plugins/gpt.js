const { OpenAI } = require('openai');
const helpers = require('../plugins');
require('dotenv').config()

const openai = new OpenAI();



module.exports.gpt  = async (sock, data, str) => {
    if (!str) {
        sock.sendMessage(sock.key.remoteJid, {
            text: '_Usage: .gpt QUERY_',
            contextInfo: helpers.contextParser(data)
        });
        return;
    }

    const messages = [
        { role: "user", content: str }
    ]

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    const responseObj = completion.choices[0].message;
    // messages.push(responseObj);

    sock.sendMessage(sock.key.remoteJid, {
        text: responseObj.content.trim(),
        contextInfo: helpers.contextParser(data)
    })



}
