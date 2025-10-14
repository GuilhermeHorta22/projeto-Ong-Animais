import express from 'express';
import { pool } from './dataBase/connection.js';
import routes from './routes/indexRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);

app.use(cors());

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirName,'..','uploads')));

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