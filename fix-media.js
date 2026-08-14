import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017/strivetechpartners";
const mediaDir = path.join(process.cwd(), 'public', 'media');
const placeholderImage = path.join(mediaDir, 'Globe.jpg'); // We'll use this as fallback

async function fixMedia() {
    console.log("Connecting to MongoDB to check missing media...");
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('strivetechpartners');
        
        const mediaCollection = db.collection('media');
        const mediaDocs = await mediaCollection.find({}).toArray();
        
        let missingCount = 0;
        
        for (const doc of mediaDocs) {
            if (doc.filename) {
                const filePath = path.join(mediaDir, doc.filename);
                if (!fs.existsSync(filePath)) {
                    console.log(`Missing file detected: ${doc.filename}. Creating placeholder...`);
                    // Copy placeholder over the missing file
                    fs.copyFileSync(placeholderImage, filePath);
                    missingCount++;
                }
            }
        }
        
        console.log(`Media check complete! Fixed ${missingCount} missing images.`);
    } catch (e) {
        console.error("Error fixing media:", e);
    } finally {
        await client.close();
    }
}

fixMedia();
