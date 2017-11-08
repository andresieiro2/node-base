import Koa from 'koa';
import cors from '@koa/cors';

import router from './app/routes';
import DB from './app/db';

const app = new Koa();

DB({
  user: "mooven",
  password: "mooven",
  db: "mooven"
});

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
