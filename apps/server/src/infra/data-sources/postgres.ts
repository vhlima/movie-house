import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT as string, 10),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities:
    process.env.NODE_ENV === 'development'
      ? ['./src/infra/entities/postgres/**/*.ts']
      : ['./build/src/infra/entities/postgres/**/*.js'],
  migrations:
    process.env.NODE_ENV === 'development'
      ? ['./src/infra/migrations/*.ts']
      : ['./build/src/infra/migrations/*.js'],
});

export const connectPostgres = async () => {
  try {
    await PostgresDataSource.initialize();

    console.log(`[Movie House] Postgres connected with sucess`);
  } catch (error) {
    console.error('[Movie House] Error connecting to Postgres: ', error);
  }
};
