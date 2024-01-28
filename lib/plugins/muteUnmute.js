module.exports.muteUnmute = async (sock, data, type) => {
    await sock.groupSettingUpdate(data.key.remoteJid, type);
}