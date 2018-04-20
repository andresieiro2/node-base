import mongoose, { Promise } from 'mongoose';
import BaseController from './BaseController';
import auth from './../middlewares/auth';

class UserController extends BaseController {

  constructor(){
    super('/users' );
    this.modelName = 'User';

    this.createDefaultRoutes(
      //set authorization middleware
      null,
      //disable some routes
      [
        { route: '/', method: 'POST' },
        { route: '/:id', method: 'DELETE' }
      ]
    );

    this.createRoute('/login', 'POST', this.login);
    this.createRoute('/', 'POST', auth, this.createUser);
  }

  async login(ctx) {
    const result = await this.model.findOne({
      email: ctx.request.body.email,
      status: 1
    })
    .then(async doc => {
      ctx.status = 200;
      ctx.body = doc;
    })
    .catch(err => {
      console.log(401, 'login inválido', JSON.stringify(err));
      ctx.status = 401;
      ctx.body = err;
    });
  }

  async createUser( ctx, next ){
    const exists = await this.model.findOne({
      email: ctx.request.body.email,
      identification: ctx.request.body.identification,
      status: 1
    }).then( async doc => {
      if( doc === null ){
        console.log(ctx.request.body)
        let userDoc = new this.model({ ...ctx.request.body });
        userDoc = await userDoc.save()
          .then(async doc => {
            this.login( ctx );
          });
      } else {
        ctx.status = 401;
        ctx.body = 'Email ou CPF já cadastrados';
      }
    });
  }
}

export default new UserController();
