const { contextParser } = require('./helpers');

module.exports.add = async (sock, data, str) => {
    if (!str) {
        sock.sendMessage(data.key.remoteJid, {
            text: 'Example: .add 2348141598267',
            contextInfo: contextParser(data)
        });
    }

    let toBeAdded = str.split(',').map(item => {
        let purified = '';
        for (let i = 0; i < item.length; i++) {
            if (!isNaN(parseInt(item[i])) && isFinite(item[i])) {
                purified += item[i];
            }
        }
        return purified + '@s.whatsapp.net';
    });

    console.log(toBeAdded)

    try {
        await sock.groupParticipantsUpdate(data.key.remoteJid, toBeAdded, 'add');
        setTimeout(async () => {
            await sock.sendMessage(data.key.remoteJid, {
                text: 'Welcome'
            });
        }, 3000)
        
    } catch (err) {
        console.log(err.message);
    }
    
}