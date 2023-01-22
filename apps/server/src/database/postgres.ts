import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities:
    process.env.NODE_ENV === 'development'
      ? ['./src/entities/pg-entities/**/*.ts']
      : ['./build/src/entities/pg-entities/**/*.js'],
  subscribers: [],
  migrations:
    process.env.NODE_ENV === 'development'
      ? ['./src/database/migrations/*.ts']
      : ['./build/src/database/migrations/*.js'],
});

export const connectPostgres = async () => {
  try {
    await PostgresDataSource.initialize();

    console.log(`[Movie House] Postgres connected with sucess`);
  } catch (error) {
    console.error('[Movie House] Error connecting to Postgres: ', error);
  }
};
