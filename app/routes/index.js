import KoaRouter from 'koa-router';
import koaBody from 'koa-body';

import Controllers from './../controllers';

const router = new KoaRouter();

Controllers.init(router);

export default router;
