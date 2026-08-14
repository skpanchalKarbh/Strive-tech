import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
  const config = await configPromise
  const payload = await getPayload({ config })
  
  const result = await payload.update({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@gmail.com'
      }
    },
    data: {
      password: 'admin123',
    }
  })
  
  console.log("Password updated correctly via Payload API", result)
  process.exit(0)
}
run()
