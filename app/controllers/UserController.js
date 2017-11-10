import mongoose from 'mongoose';
import BaseController from './BaseController';

class UserController extends BaseController {

  constructor(router){
    super(router, '/user', 'User' );
    this.modelName = 'User';

    this.createRoute('/login', 'POST', this.login);
  }

  async login(ctx, next) {
    console.log(this,'login');
  }
}

export default UserController;
