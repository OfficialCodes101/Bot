// const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database('./bot.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       console.log('Connected to the database');
//     }
// });

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
    let message;
    message = msg?.message?.extendedTextMessage?.text;
    if (message) {
        return message;
    }
    message = msg?.message?.conversation;
    if (message) {
        return message;
    }
    message = msg?.message?.imageMessage?.caption;
    if (message) {
        return message;
    }
    message = msg?.message?.videoMessage?.caption;
    if (message) {
        return message;
    }
};

/*
module.exports.getSudoArray = async () => {
    // Run a simple query
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM sudo', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
            // Process the retrieved rows
                let sudos = rows.map(elem => {
                    return elem.jid;
                });
                resolve(sudos);
            }
        });
    })
    
}
*/

module.exports.numberFormatter = (number) => {
    const pattern = /(\d+)(?::\d+)?/;
    const matches = pattern.exec(number);

    return matches[1];
};


module.exports.isAdmin = async (sock, remoteJid, jid) => {
    const properJid = this.numberFormatter(jid) + '@s.whatsapp.net';
    const groupMetadata = await sock.groupMetadata(remoteJid);
    const participants = groupMetadata.participants;
    const interestedIn = participants.filter(item => {
        return item.id === properJid;
    });
    return !!interestedIn[0].admin;
}