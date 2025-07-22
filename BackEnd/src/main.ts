import express from 'express';
import { pool } from './dataBase/connection.js';
import routes from './routes/indexRoutes.js';
import cors from 'cors';


const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

const PORT = 3000;

pool.connect()
  .then(() => {
    console.log('Conectado ao banco!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco: ', err);
  });