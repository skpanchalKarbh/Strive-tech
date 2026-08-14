const { MongoClient, ObjectId } = require('mongodb');

async function run() {
  const uri = 'mongodb://teamkarbh_db_user:Dd0ObJq4MLcb9PCD@ac-zpwuglv-shard-00-00.juhv9yq.mongodb.net:27017,ac-zpwuglv-shard-00-01.juhv9yq.mongodb.net:27017,ac-zpwuglv-shard-00-02.juhv9yq.mongodb.net:27017/strivetechpartners?ssl=true&authSource=admin&retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    // Get the page
    const page = await db.collection('pages').findOne({ slug: 'for-job-seekers' });
    if (!page) {
        console.log("Job Seekers page not found");
        return;
    }
    console.log("Page layout blocks:");
    for (const block of page.layout) {
        if (block.blockType === 'reusable_block') {
            const reusable = await db.collection('reusable_blocks').findOne({ _id: new ObjectId(block.reusableContent) });
            console.log(`- Reusable Block (${block.blockName}):`);
            console.log(JSON.stringify(reusable.layout, null, 2));
        } else {
            console.log(`- Inline Block (${block.blockType}):`);
            console.log(JSON.stringify(block, null, 2));
        }
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
