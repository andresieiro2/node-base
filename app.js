import Koa from 'koa';
import cors from '@koa/cors';

import router from './app/routes';
import BD from './app/models';

const app = new Koa();

BD({
  user: "mooven",
  password: "mooven",
  db: "mooven"
});
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
