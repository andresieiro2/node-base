import mongoose from 'mongoose';
import koaBody from 'koa-body';
import router from './../routes';

export default class BaseController {
  static prefix = "/";
  static modelName = "noModel" ;

  get model() {
    return mongoose.model(this.modelName);
  }

  constructor(prefix){
    this.prefix = prefix;
    this.createDefaultRoutes = this.createDefaultRoutes.bind(this);
  }

  createDefaultRoutes(middleware = null, disabledRoutes = []) {
    const defaultRoutes = [
      { route:'/', method: "GET", cb: this.getAll },
      { route:'/:id', method: "GET", cb: this.getById   },
      { route:'/', method: "POST", cb: this.create },
      { route:'/', method: "PUT", cb: this.update  },
      { route:'/:id', method: "DELETE", cb: this.delete }
    ];

    const routes = _.pullAllWith(defaultRoutes, disabledRoutes, (r,rr) => {
      return r.route === rr.route && r.method.toUpperCase() === rr.method.toUpperCase();
    });

    for (var i = 0; i < routes.length; i++) {
      let route = routes[i];

      if(middleware){
        this.createRoute(route.route, route.method, middleware, route.cb);
      } else {
        this.createRoute(route.route, route.method, route.cb);
      }
    }

  }

  createRoute(route, method, ...params) {
    route = this.prefix + route;

    for (let index in params) {
     if(typeof params[index] === 'function' ){
       params[index] = params[index].bind(this);
     };
    }

    switch (method.toUpperCase()) {
      case "GET":
      case "DEL":
      case "DELETE":
        this.setRouteMethod(method, route, ...params);
      break;
      case "POST":
      case "PUT":
        this.setRouteMethod(method, route, koaBody() , ...params );
      break;
      case "UPLOAD":
        this.setRouteMethod('POST', route, koaBody({ multipart: true }) , ...params );
      break;
     default:
    }
  }

  setRouteMethod(method, ...params) {
    switch (method.toUpperCase()) {
      case "GET":
        router.get(...params);
      break;
      case "POST":
        router.post(...params);
      break;
      case "DEL":
      case "DELETE":
        router.del(...params);
      break;
      case "PUT":
        router.put(...params);
      break;
     default:
    }
  }

  async getAll(ctx, next) {
    const result = await this.model.listAll()
    .then( docs => {
      ctx.status = 200;
      ctx.body = docs;
    })
    .catch( err => {
      console.log(400, JSON.stringify(err));
      ctx.status = 400;
      ctx.body = err;
    });
  }

  async getById(ctx, next) {
    const result = await this.model.findById(ctx.params.id, { status: 1 })
    .then( doc => {
      ctx.status = 200;
      ctx.body = doc;
    })
    .catch( err => {
      console.log(400, JSON.stringify(err));
      ctx.status = 400;
      ctx.body = err;
    });

  }

  async create(ctx, next) {
    await this.model.create(ctx.request.body)
    .then( doc => {
      ctx.status = 200;
      ctx.body = JSON.stringify(doc);
    })
    .catch( err => {
      console.log(400, JSON.stringify(err));
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    })
  }

  async update(ctx) {
    await this.model.update(
      { _id: ctx.request.body.id },
      {...ctx.request.body}
    )
    .then( doc => {
      ctx.status = 200;
      ctx.body = JSON.stringify(doc);
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    });
  }

  async delete(ctx) {
    await this.model.update(
      { _id: ctx.request.body.id },
      { status: 2 }
    )
    .then( doc => {
      ctx.status = 200;
      ctx.body = JSON.stringify(doc);
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    });
  }

};
