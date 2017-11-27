import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

export default class BaseModel {

  get model() {
    return mongoose.model(this.modelClass.name);
  }

  get modelClass() {
    return this._modelClass;
  }

  set modelClass(mc){
    this._modelClass = mc;
    this.setSchema();
  }

  async setSchema() {
    const methods = Object.getOwnPropertyNames(this.modelClass.prototype).filter(x => x !== 'constructor')
    this.schema = new Schema(
      {
        status: {
          type: Number,
          default: 1,
          required: [true, 'Status é obrigatório'],
        },
        ...this.modelClass.fields
      },
      { timestamps: true  },
    );

    for (var i = 0 ; i < methods.length ; i++ ) {
      this.schema.statics[methods[i]] = this.modelClass.prototype[methods[i]];
    }

    this.schema.statics.findById = this.findById.bind(this);
    this.schema.statics.list = this.list.bind(this);

    this.schema.plugin(autopopulate);
    this.schema.plugin(mongoosePaginate);

    mongoose.model(this.modelClass.name, this.schema);

  }

  async findById(id, params = {}) {

    let searchParams = {
      _id: id,
      ...params
    }

    const result = await this.model.find(searchParams);

    return result[0];
  }

  async list(params){
    const pagination = {};
    const searchParams = {
      ...params
    }

    pagination.limit =   params.limit ? parseInt(params.limit) : -1 ;
    pagination.page = params.page ? parseInt(params.page) : 1;

    delete searchParams.limit;
    delete searchParams.page;

    return await this.model.paginate(searchParams , pagination );
  }

}
