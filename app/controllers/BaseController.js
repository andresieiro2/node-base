import mongoose from 'mongoose';
import koaBody from 'koa-body';
import config from './../../config.json';
import _ from 'lodash';

class BaseController {
  static prefix = "/";
  static modelName = "noModel" ;

  get model() {
    return mongoose.model(this.modelName);
  }

  constructor(router, prefix){
    this.prefix = prefix;
    this.router = router;
    this.createDefaultRoutes = this.createDefaultRoutes.bind(this);
  }

  createDefaultRoutes(disabledRoutes = []) {
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
      this.createRoute(route.route, route.method, route.cb);
    }

  }

  createRoute(route, method, ...params) {
    route = `/${config.api.version}${this.prefix}${route}`;
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
        this.setRouteMethod(method , route, koaBody() , ...params );
      break;
     default:
    }
  }

  setRouteMethod(method, ...params) {
    switch (method.toUpperCase()) {
      case "GET":
        this.router.get(...params);
      break;
      case "POST":
        this.router.post(...params);
      break;
      case "DEL":
      case "DELETE":
        this.router.del(...params);
      break;
      case "PUT":
        this.router.put(...params);
      break;
     default:
    }
  }

  async getAll(ctx, next) {
    const result = await this.model.list(ctx.query)
    .then( docs => {
      ctx.status = 200;
      ctx.body = docs;
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = err;
    });
  }

  async getById(ctx, next) {
    const result = await this.model.findById(ctx.params.id)
    .then( doc => {
      ctx.status = 200;
      ctx.body = doc;
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = err;
    });

  }

  async create(ctx, next) {
    let result =  new this.model({
      ...ctx.request.body
    })

    result = await result.save()
    .then( doc => {
      ctx.status = 200;
      ctx.body = JSON.stringify(doc);
    })
    .catch( err => {
      console.log(err);
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    })
  }

  async update(ctx) {
    const resultfind = await this.model.findById(ctx.request.body.id)
    .then( async doc => {
      const update = await this.updateDoc(ctx, doc, ctx.request.body);
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    });

  }

  async delete(ctx) {
    const resultfind = await this.model.findById(ctx.params.id)
    .then( async doc => {
      const update = await this.updateDoc(ctx, doc, { status: 2 });
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    });
  }

  async updateDoc(ctx, doc, docparams) {
    if(doc){
      docparams.updatedAt = Date.now();
      doc.set(docparams)

      const result = await doc.save()
      .then( result => {
        ctx.status = 200;
        ctx.body = JSON.stringify(result);
      })
      .catch( err => {
        ctx.status = 400;
        ctx.body = JSON.stringify(err);
      })
    } else {
      ctx.status = 204;
    }

  }

}

export default BaseController;
