import mongoose from 'mongoose';
import BaseController from './BaseController';

class UserController extends BaseController {

  constructor(router){
    super(router, '/user', 'User' );
    this.modelName = 'User';
  }


}

export default UserController;
