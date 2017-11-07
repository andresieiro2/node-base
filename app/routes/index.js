import KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import parser from './../util/parser';

import UserController from './../controllers/UserController';

const router = new KoaRouter();

router.get('/*', koaBody() , parser);
router.post('/*', koaBody() , parser);
router.put('/*', koaBody() , parser);
router.del('/*', koaBody() , parser);

new UserController(router);

export default router;
