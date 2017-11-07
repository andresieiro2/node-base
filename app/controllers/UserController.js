import BaseController from './BaseController';

class UserController extends BaseController {

  constructor(router){
    super(router, '/user');
  }

}

export default UserController;
