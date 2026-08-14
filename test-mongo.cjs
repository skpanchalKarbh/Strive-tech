const { MongoClient } = require('mongodb');
const uri = "mongodb://teamkarbh_db_user:Dd0ObJq4MLcb9PCD@ac-zpwuglv-shard-00-00.juhv9yq.mongodb.net:27017,ac-zpwuglv-shard-00-01.juhv9yq.mongodb.net:27017,ac-zpwuglv-shard-00-02.juhv9yq.mongodb.net:27017/strivetechpartners?ssl=true&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } catch(e) {
    console.error("Connection failed:", e);
  } finally {
    await client.close();
  }
}
run();
