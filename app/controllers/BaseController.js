import mongoose from 'mongoose';

class BaseController {
  static prefix = "/";
  static modelName = "noModel" ;

  get model() {
    return mongoose.model(this.modelName);
  }

  constructor(router, prefix){
    this.prefix = prefix;

    router.get(prefix+"/:id" , this.get.bind(this) );
    router.post(prefix , this.create.bind(this) );
    router.put(prefix , this.update.bind(this) );
    router.del(prefix , this.delete.bind(this) );
  }

  get(ctx) {
    this.model.find({
      _id: ctx.params.id,
    }).then((user) => {
      console.log('get', user);
    });
  }

  create(ctx) {
   console.log('create', ctx.response.body);
  }

  update(ctx) {
    console.log('update', ctx.response.body);
  }

  delete(ctx) {
    console.log('delete', ctx.response.body);
  }
}

export default BaseController;
