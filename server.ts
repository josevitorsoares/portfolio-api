import { app } from '@app';
import { API_PORT } from './configs/environment';

app
  .listen({
    port: API_PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.info('################################################');
    console.info(`#              🚀 Server listening             #`);
    console.info(`################################################`);
  })
  .catch(error => {
    console.error('Error Starting Server: ', error);

    process.exit(1);
  });
