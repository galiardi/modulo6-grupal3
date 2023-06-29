import { createServer } from 'http';
import express, { json } from 'express';
import { PORT } from './config.js';
import routes from './routes/index.js';

const app = express();
app.use(json());
app.use('/', routes);

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// PROBLEMA: Cuando nodemon reinicia el servidor, el puerto esta ocupado.
// Esto mata el proceso en el pid y nodemon puede reiniciar el servidor
process.once('SIGUSR2', function () {
  console.log('SIGUSR2', process.pid);
  process.kill(process.pid, 'SIGUSR2');
});
