import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless'

const createClient = async (connectionString: string = 'postgresql://postgres:postgres@db:5432/postgres') => {
  const pool = new Pool({
    connectionString,
    ssl: false,
  })

  neonConfig.pipelineTLS = false
  neonConfig.pipelineConnect = false
  neonConfig.useSecureWebSocket = false
  neonConfig.wsProxy = '127.0.0.1/v1'

  const drizzleClient = drizzle(pool)
  await pool.connect()

  return drizzleClient
}

export default createClient
