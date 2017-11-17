import mongoose from 'mongoose';
import BaseController from './BaseController';

class ServiceController extends BaseController {

  constructor(router){
    super(router, '/services' );
    this.modelName = 'Service';
    this.createDefaultRoutes(
      null,
      //disable some routes
      [
        // { route: '/', method: 'POST' },
        { route: '/:id', method: 'DELETE' },
        { route: '/', method: 'PUT' },
      ]
    );
;
  }

}

export default ServiceController;
