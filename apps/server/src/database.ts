import mongoose from 'mongoose';

export default () => {
  const db =
    'mongodb+srv://vtr:master123@cluster0.smeez.mongodb.net/?retryWrites=true&w=majority';

  const connect = () => {
    mongoose
      .connect(db, { user: 'vtr', pass: 'master123' })
      .then(() => console.info(`[Movie House] Database connected with sucess`))
      .catch(error => {
        console.error('[Movie House] Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
