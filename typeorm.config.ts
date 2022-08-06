import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres-db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres-db',
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  entities: ['dist/entity/**/*{.js,.ts}'],
  migrations: ['dist/migration/**/*{.js,.ts}'],
  subscribers: ['dist/subscriber/**/*{.js,.ts}'],
  synchronize: false,
};

export = typeOrmConfig;
