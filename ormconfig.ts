import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export default new DataSource({
  type: 'postgres',
  host: '0.0.0.0',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: `local-migrations`,
  migrations: ['migrations/*/*.ts'],
})
