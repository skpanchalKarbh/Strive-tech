import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import fs from 'fs'
import path from 'path'

async function run() {
  try {
    const payload = await getPayload({ config: configPromise })

    const imagePath = 'C:\\Users\\kalpe\\.gemini\\antigravity\\brain\\6b0cfd0e-a594-4db2-a7b3-f1d22a435622\\career_commitment_1780044946482.png'
    const fileName = 'career_commitment.png'

    const fileData = fs.readFileSync(imagePath)
    
    // Create Media record
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Career Commitment Professional',
      },
      file: {
        data: fileData,
        mimetype: 'image/png',
        name: fileName,
        size: fileData.length,
      },
    })
    
    console.log('Successfully uploaded Media:', media)
    process.exit(0)
  } catch (err) {
    console.error('Failed to upload media:', err)
    process.exit(1)
  }
}

run()
