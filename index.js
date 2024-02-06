const {
  DisconnectReason,
  useMultiFileAuthState,
  makeInMemoryStore,
  jidDecode
} = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys").default;
const { processIncomingMessages } = require('./processMessages');


async function connectionLogic() { 
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  // const store = makeInMemoryStore({});
  // // can be read from a file
  // store.readFromFile("./baileys_store.json");
  // // saves the state to a file every 10s
  // setInterval(() => {
  //   store.writeToFile("./baileys_store.json");
  // }, 10_000);
  const sock = makeWASocket({
    // can provide additional config here
    printQRInTerminal: true,
    auth: state,
  });

  // store.bind(sock.ev);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update || {};

    if (qr) {
      console.log(qr);
      // write custom logic over here
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        connectionLogic();
      }
    }
  });

  sock.ev.on("messages.update", (messageInfo) => {
    console.log(messageInfo);
  });


  sock.ev.on("messages.upsert", async (messageInfoUpsert) => {
    console.log(`${JSON.stringify(messageInfoUpsert?.messages[0], null, 2)}`);
    await processIncomingMessages(sock, messageInfoUpsert);
  });
  sock.ev.on("creds.update", saveCreds);
}

connectionLogic();

