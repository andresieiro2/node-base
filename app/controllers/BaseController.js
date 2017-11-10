import mongoose from 'mongoose';
import koaBody from 'koa-body';

class BaseController {
  static prefix = "/";
  static modelName = "noModel" ;

  get model() {
    return mongoose.model(this.modelName);
  }

  constructor(router, prefix){
    this.prefix = prefix;
    this.router = router;

    this.setMiddlewares = this.setMiddlewares.bind(this);
    this.createDefaultRoutes = this.createDefaultRoutes.bind(this);
  }


  setMiddlewares(middlewares) {
    for (let i in middlewares) {
      let m = middlewares[i];
      this.setRouteMethod(m.method, this.prefix + m.path, m.middleware)
    }
  }

  createDefaultRoutes() {
    this.createRoute("/", "GET", this.getAll );
    this.createRoute("/:id", "GET", this.getById );
    this.createRoute("/", "POST", this.create );
    this.createRoute("/", "PUT", this.update );
    this.createRoute("/:id", "DELETE", this.delete );
  }

  createRoute(route, method, cb) {
    route = this.prefix + route;

    switch (method.toUpperCase()) {
      case "GET":
      case "DEL":
      case "DELETE":
        this.setRouteMethod(method, route, cb.bind(this));
      break;
      case "POST":
      case "PUT":
        this.setRouteMethod(method , route, koaBody() , cb.bind(this) );
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
    const result = await this.model.listAll()
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
    const result = await this.model.findById(ctx.params.id, { status: 1 })
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
