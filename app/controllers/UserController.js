import mongoose from 'mongoose';
import BaseController from './BaseController';

class UserController extends BaseController {

  constructor(router){
    super(router, '/user', 'User' );
    this.modelName = 'User';
  }

  create(ctx) {
    console.log('Overrided Create Method');
    this.model.customModelMethod();

    // Fake add User
    // User = new User({
    //   name: "Teste2",
    // });

    // User.save().then( () => {
    //   console.log('saved');
    // })
  }
}

export default UserController;
