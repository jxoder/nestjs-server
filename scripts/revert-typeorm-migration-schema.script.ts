import * as dotenv from 'dotenv'
import { $ } from 'execa'
import * as fs from 'fs'
import path from 'path'

const appName = process.argv[2]
const env = process.argv[3] ?? 'local'

if (!['local', 'dev', 'prod'].includes(env)) {
  console.error(`Invalid env: ${env} => must be in local, dev, prod`)
  process.exit(1)
}

const envFile = env === 'local' ? '.env' : `.env.${env}`

if (!fs.existsSync(path.join(process.cwd(), envFile))) {
  console.error(`not found env file: ${envFile}`)
  process.exit(1)
}

dotenv.config({ path: envFile })

const apps = fs.readdirSync(path.join(process.cwd(), 'apps'))

if (!appName || !apps.includes(appName)) {
  console.error(`Invalid app name: ${appName} => must be in ${apps.join(',')}`)
  process.exit(1)
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required')
  process.exit(1)
}

const configContent = `
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default new DataSource({
  type: 'postgres',
  url: '${process.env.DATABASE_URL}',
  entities: ['apps/${appName}/src/**/entities/*.entity.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: \`migrations-${appName}\`,
  migrations: ['migrations/${appName}/*.ts'],
});
`

const configFileName = `typeorm.${appName}.config.ts`
fs.writeFileSync(path.join(process.cwd(), configFileName), configContent)

$`pnpm typeorm migration:revert -d ${configFileName}`
  .then(() => {
    fs.unlinkSync(path.join(process.cwd(), configFileName))
    console.log('complete')
  })
  .catch(error => {
    fs.unlinkSync(path.join(process.cwd(), configFileName))
    console.error(error)
    process.exit(1)
  })
