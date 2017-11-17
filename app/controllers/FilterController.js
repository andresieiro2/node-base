import mongoose from 'mongoose';
import BaseController from './BaseController';

class FilterController extends BaseController {

  constructor(router){
    super(router, '/filter' );
    this.modelName = 'Filter';
    // this.createDefaultRoutes(
    //   null,
    //   //disable some routes
    //   [
    //     { route: '/', method: 'POST' },
    //     { route: '/:id', method: 'DELETE' },
    //     { route: '/', method: 'PUT' },
    //   ]
    // );

    this.createRoute('/','GET', this.getFilters)
  }

  async getFilters(ctx, next) {
    const serviceFilter = mongoose.model('ServiceFilter');

    const f = await this.model.find()
    .then( async filters => {
      const promisses = [];

      for (var i = 0; i < filters.length; i++) {
        promisses.push(
          serviceFilter.find({
            filter: filters[i].id,
          })
        );
      }

      const r = await Promise.all(promisses)
      .then( result => {
        let filtersList = [];

        for (var i = 0; i < filters.length; i++) {
          const filter = filters[i];
          let _services = [];

          for (var n = 0; n < result[i].length; n++) {
            _services.push(result[i][n].service) ;
          }

          filtersList.push({
            ...filter._doc,
            services:  _services
          });

        }

        ctx.body = filtersList;
        ctx.status = 200;
      })
    })
  }
}

export default FilterController;
