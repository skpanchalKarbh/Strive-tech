const { MongoClient } = require('mongodb');

const LOCAL_URI = 'mongodb://127.0.0.1:27017';
const LIVE_URI = 'mongodb+srv://teamkarbh_db_user:Dd0ObJq4MLcb9PCD@strivetechpartners.juhv9yq.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'strivetechpartners';

async function migrate() {
    console.log('Connecting to Local DB...');
    const localClient = await MongoClient.connect(LOCAL_URI);
    const localDb = localClient.db(DB_NAME);

    console.log('Connecting to Live DB (Atlas)...');
    const liveClient = await MongoClient.connect(LIVE_URI);
    const liveDb = liveClient.db(DB_NAME);

    const collections = await localDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections in local database.`);
    
    for (const colInfo of collections) {
        const colName = colInfo.name;
        if (colName === 'system.profile') continue;
        
        console.log(`\nCopying collection: ${colName}`);
        const localCol = localDb.collection(colName);
        const liveCol = liveDb.collection(colName);
        
        const docs = await localCol.find({}).toArray();
        if (docs.length > 0) {
            // Drop existing collection on live to avoid duplicate keys
            try {
                await liveCol.drop();
                console.log(`  - Dropped existing collection '${colName}' on live DB.`);
            } catch (e) {
                // Ignore drop errors if it doesn't exist
            }
            
            await liveCol.insertMany(docs);
            console.log(`  - Inserted ${docs.length} documents into '${colName}'.`);
        } else {
            console.log(`  - Collection '${colName}' is empty. Skipping.`);
        }
    }

    console.log('\n✅ Database Migration Completed Successfully!');
    await localClient.close();
    await liveClient.close();
}

migrate().catch(console.error);
