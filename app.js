import Koa from 'koa';
import cors from '@koa/cors';
import router from './app/routes';

const app = new Koa();

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
