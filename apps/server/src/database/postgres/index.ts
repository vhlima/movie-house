import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'MovieHouse',
  synchronize: true, // TODO on production, remove that
  logging: false, // TODO production, remove that
  entities: ['./src/entities/postgres/**/*.ts'],
  subscribers: [],
  migrations: ['./src/database/postgres/migrations/*.ts'],
});

export const connectPostgres = async () => {
  try {
    await PostgresDataSource.initialize();

    console.log(`[Movie House] Postgres connected with sucess`);
  } catch (error) {
    console.error('[Movie House] Error connecting to Postgres: ', error);
  }
};
