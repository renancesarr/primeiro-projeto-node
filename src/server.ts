import express from 'express';
import routes from './routes';

// inicia servidor
const app = express();

app.use(express.json());
app.use(routes);

// uma rota de retorno

// escuta uma porta
app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
