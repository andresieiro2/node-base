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

    this.createRoute("/", "GET", this.getAll );
    this.createRoute("/:id", "GET", this.getById );
    this.createRoute("/", "POST", this.create );
    this.createRoute("/", "PUT", this.update );
    this.createRoute("/:id", "DELETE", this.delete );
  }

  createRoute(route, method, cb) {
    switch (method.toUpperCase()) {
      case "GET":
        this.router.get(this.prefix + route, cb.bind(this));
      break;
      case "POST":
        this.router.post(this.prefix + route, koaBody() , cb.bind(this));
      break;
      case "DEL":
      case "DELETE":
        this.router.del(this.prefix + route, cb.bind(this));
      break;
      case "PUT":
        this.router.put(this.prefix + route, koaBody() , cb.bind(this));
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
      const update = await this._updateDoc(ctx, doc, ctx.request.body);
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    });

  }

  async delete(ctx) {
    const resultfind = await this.model.findById(ctx.params.id)
    .then( async doc => {
      const update = await this._updateDoc(ctx, doc, { status: 2 });
    })
    .catch( err => {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    });
  }

  async _updateDoc(ctx, doc, params) {
    if(doc){
      params.updatedAt = Date.now();
      doc.set(params)

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
      ctx.status = 400;
      ctx.body = "No records found";
    }

  }

}

export default BaseController;
