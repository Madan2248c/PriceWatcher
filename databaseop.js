const { initializeApp } = require('firebase/app');
const { getDatabase, ref,get,child, set,push} = require('firebase/database');

// const firebaseConfig = {'<YOUR_FIREBASE_CONFIGR'};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const databaseop = {
  writeDataToRealtimeDB : function(product) {
    const dbRef = ref(database, `products/`);
    push(dbRef, product)
    .then(() => {
      console.log('Data written successfully!');
    })
    .catch((error) => {
      console.error('Error writing data: ', error);
    });
  },

  writeAboutMessage : function(message) {
    const dbref = ref(database,'messages/');
    push(dbref,message)
    .then(() => {
      console.log('Data written successfully!');
    })
    .catch((error) => {
      console.error('Error writing data: ', error);
    });
  },

  readDataFromRealtimeDB : async function() {
    const dbRef = ref(database);

    try {
      const snapshot = await get(child(dbRef, 'products/'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  },

  retrieveLinksFromRealtimeDB: async function () {
    try {
      var txt = await this.readDataFromRealtimeDB();
  
      const chatEntries = txt;
  
      let result = [];
  
      if (chatEntries) {
        for (const key in chatEntries) {
          if (chatEntries.hasOwnProperty(key)) {
            const entry = chatEntries[key];
            const chatId = entry.chatId;
            const link = entry.link;
            const target_price = entry.target_price;
  
            result.push({
              chatId: chatId,
              link: link,
              target_price: target_price,
            });
          }
        }
      }
  
      return result;
  
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },

  getAllMessages : async function () {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, 'messages/'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  },
  retrieveMessagesFromRealtimeDB : async function () {
    var msgs = await this.getAllMessages();
    let result = [];
    for (const key in msgs) {
      if (msgs.hasOwnProperty(key)) {
        const entry = msgs[key];
        // console.log(entry);
        result.push({
          chat_id: entry.chat_id,
          link: entry.link,
          time : entry.time
        });
      }
    }
    return result;
  }
}


module.exports = databaseop;