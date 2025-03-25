import { $ } from 'execa'
import * as fs from 'fs'
import path from 'path'

const appName = process.argv[2]
const apps = fs.readdirSync(path.join(process.cwd(), 'apps'))

if (!appName || !apps.includes(appName)) {
  console.error(`Invalid app name: ${appName} => must be in ${apps.join(',')}`)
  process.exit(1)
}

const configContent = `
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default new DataSource({
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
  entities: ['apps/${appName}/src/**/entities/*.entity.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: \`migrations-${appName}\`,
  migrations: ['migrations/${appName}/*.ts'],
});
`

const configFileName = `typeorm.${appName}.config.ts`
fs.writeFileSync(path.join(process.cwd(), configFileName), configContent)

$`pnpm typeorm migration:generate migrations/${appName}/migration -p -d ${configFileName}`
  .then(() => {
    fs.unlinkSync(path.join(process.cwd(), configFileName))
    console.log('complete')
  })
  .catch(error => {
    fs.unlinkSync(path.join(process.cwd(), configFileName))
    console.error(error)
    process.exit(1)
  })
