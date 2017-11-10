import mongoose from 'mongoose';

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
        },
        ...this.modelClass.fields
      },
      { timestamps: true  },
    );

    for (var i = 0 ; i < methods.length ; i++ ) {
      this.schema.statics[methods[i]] = this.modelClass.prototype[methods[i]];
    }

    this.schema.statics.findById = this.findById.bind(this);
    this.schema.statics.listAll = this.listAll.bind(this);

    mongoose.model(this.modelClass.name, this.schema);

  }

  async findById(id, params) {

    let searchParams = {
      _id: id
    }

    params ? searchParams = {
      ...searchParams,
      ...params,
    } : null

    const result = await this.model.find(searchParams);

    return result[0]
  }

  async listAll(){
    return await this.model.find({
      status: 1,
    })
  }
}
