const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://teamkarbh_db_user:Dd0ObJq4MLcb9PCD@strivetechpartners.juhv9yq.mongodb.net/strivetechpartners";
const client = new MongoClient(uri);

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
