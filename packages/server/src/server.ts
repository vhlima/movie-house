import express, { Request, Response } from 'express';

const SERVER_PORT = 3333;

const app = express();

// app.use(cors());
app.use(express.json());
// app.use('/files', express.static(uploadConfig.directory));
// app.use(routes);

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (err: Error, req: Request, res: Response) =>
  res.status(200).json({ message: 'Sucess!' }),
);

app.listen(SERVER_PORT, () => {
  console.log(`[Movie House] Server started on port: ${SERVER_PORT}`);
});
