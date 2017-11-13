import mongoose from 'mongoose';
import BaseController from './BaseController';
import auth from './../middlewares/auth';
import randtoken from 'rand-token';

class UserController extends BaseController {

  constructor(router){
    super(router, '/user' );
    this.modelName = 'User';

    this.createDefaultRoutes(
      //set authorization middleware
      auth,
      //disable some routes
      [
        { route: '/', method: 'POST' },
        { route: '/:id', method: 'DELETE' }
      ]
    );

    this.createRoute('/login', 'POST', auth, this.login);
  }

  async login(ctx, next) {
    const resultfind = await this.model.find(
      {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
      }
    )
    .then( async doc => {
      const update = await this.updateDoc(ctx, doc[0], { token: randtoken.generate(64) });
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    })
  }
}

export default UserController;
