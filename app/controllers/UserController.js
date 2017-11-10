import mongoose from 'mongoose';
import BaseController from './BaseController';
import randtoken from 'rand-token';

class UserController extends BaseController {

  constructor(router){
    super(router, '/user' );
    this.modelName = 'User';

    this.createRoute('/login', 'POST', this.login);
  }

  async create(ctx, next) {
    ctx.status = 405;
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
