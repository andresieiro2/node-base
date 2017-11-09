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

    router.get(prefix+"/:id" , this.get.bind(this) );
    router.post(prefix , koaBody(), this.create.bind(this) );
    router.put(prefix , koaBody(), this.update.bind(this) );
    router.del(prefix , koaBody(), this.delete.bind(this) );
  }

  async get(ctx, next) {
    if( mongoose.Types.ObjectId.isValid(ctx.params.id ) ){
      let Result = await this.model.find({
        _id: ctx.params.id,
      });

      if(Result.length > 0) {
        ctx.status = 200;
        ctx.body = JSON.stringify(Result);
      } else {
        ctx.status = 404;
        ctx.body = "No records found";
      }

    } else {
      ctx.status = 400;
      ctx.body = "Invalid ID";
    }
  }

  async create(ctx, next) {
    let Result = new this.model({
      ...ctx.request.body
    });

    try {
      Result = await Result.save();
      ctx.status = 200;
      ctx.body = JSON.stringify(Result);
    }catch(err) {
      ctx.status = 400;
      ctx.body = JSON.stringify(err);
    }
  }

  async update(ctx) {
    console.log('update', ctx.response.body);
  }

  async delete(ctx) {
    console.log('delete', ctx.response.body);
  }
}

export default BaseController;
