import config from './config.json';
import Koa from 'koa';
import cors from '@koa/cors';
import router from './app/routes';
import DB from './app/db';
import './app/controllers';
import './app/models';

const app = new Koa();

DB({
  db: config.DB.dbname,
  user: config.DB.user,
  password: config.DB.password,
  host: config.DB.host,
});

app.use(cors());
app.use(router.middleware());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
