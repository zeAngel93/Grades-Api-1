import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    let grade = req.body;

    const data = JSON.parse(await readFile(global.filename));
    grade = {
      id: data.nextId++,
      ...grade,
      timestamp: new Date().toISOString(),
    };
    data.grades.push(grade);
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.send(grade);
    //let x=new Date()
    console.log(new Date().toISOString());
  } catch (err) {
    console.log('error post');
  }
});
router.patch('/:id', async (req, res) => {
  // actualizacion de recurso (cuenta) completa
  try {
    const grade = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.grades.findIndex(
      (a) => a.id === parseInt(req.params.id)
    );
    if (index === -1) {
      throw new Error('Registro no encontrado');
    }
    //data.grades[index].student = grade.student;
    //data.grades[index].subjetc = grade.ubjetc;
    //data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    await writeFile(global.filename, JSON.stringify(data));
    res.send(data.grades[index]);
  } catch (err) {
    console.log(err);
  }
});
router.get('/:id', async (req, res) => {
  //consulta
  try {
    const data = JSON.parse(await readFile(global.filename));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );
    res.send(grade);
  } catch (err) {
    console.log('error get');
  }
});
router.delete('/:id', async (req, res) => {
  // exclusion
  try {
    const data = JSON.parse(await readFile(global.filename));
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.filename, JSON.stringify(data));

    res.send(`DELETE /grade/: id${req.params.id} `);
  } catch (err) {
    console.log('error delete');
  }
});
router.patch('/:student/:subject', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    /*
    let value = data.grades.reduce((acc, current) => {
      req.params.student === current.student &&
      req.params.subject === current.subject
        ? current
        : 0;
      return acc + current.value;
    }, 0);
    */
    console.log(data);
    let value = 0;
    for (let i = 0; i < data.grades.length; i++) {
      if (
        req.params.student === data.grades[i].student &&
        req.params.subject === data.grades[i].subject
      ) {
        value += data.grades[i].value;
      }
    }
    res.send(JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
});
export default router;
