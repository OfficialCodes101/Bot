const { contextParser, numberFormatter, isAdmin } = require('./helpers');

module.exports.add = async (sock, data, str) => {
    if (!str) {
        sock.sendMessage(data.key.remoteJid, {
            text: 'Example: .add 2348141598267',
            contextInfo: contextParser(data)
        });
    }

    let toBeAdded = str.split(',').map(item => {
        return numberFormatter(item) + '@s.whatsapp.net';
    });

    console.log(toBeAdded);

    let botIsAdmin = await isAdmin(sock, data.key.remoteJid, sock.user.id);
    if (!botIsAdmin) {
        await sock.sendMessage(data.key.remoteJid, {
            text: '_I\'m not admin, idiot_'
        });
        return;
    }

    let result = await sock.groupParticipantsUpdate(data.key.remoteJid, toBeAdded, 'add');
    let success = result.every(item => item.status == '200');
    
    if (success) {
        await sock.sendMessage(data.key.remoteJid, {
            text: 'Welcome'
        });
    } else {
        await sock.sendMessage(data.key.remoteJid, {
            text: 'Couldn\'t add one or more persons, for some reason. I blame Nathan'
        });
    }
}