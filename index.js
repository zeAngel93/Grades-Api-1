import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;
import router from './Routes/grade.js';
const app = express();
app.use(express.json());
const port = 3000;
global.filename = 'grades.json';
app.use('/grade', router); // asociar la ruta a la instacia de express
app.listen(port, async () => {
  try {
    console.log('API Started!');
  } catch (err) {
    logger.error(err);
  }
});
