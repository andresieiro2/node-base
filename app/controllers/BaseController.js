class BaseController {
  static prefix = "/";

  constructor(router, prefix){
    this.prefix = prefix;

    router.get(prefix+"/:id" , this.get );
    router.post(prefix , this.create );
    router.put(prefix , this.update );
    router.del(prefix , this.delete );
  }

  get(ctx) {
    console.log('get', ctx.params.id);
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
