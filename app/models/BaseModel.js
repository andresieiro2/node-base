import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('mongoose-slug-generator');
var bcrypt = require('mongoose-bcrypt');


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
    this.schema.statics.create = this.create.bind(this);
    this.schema.statics.update = this.update.bind(this);

    this.schema.plugin(autopopulate);
    this.schema.plugin(uniqueValidator);
    this.schema.plugin(slug);
    this.schema.plugin(bcrypt);

    mongoose.model(this.modelClass.name, this.schema);

    const modelMethods = Object.getOwnPropertyNames(this.model.Query.base);

    for (i = 0 ; i < modelMethods.length ; i++ ) {
      if(this.model[modelMethods[i]] && typeof this.model[modelMethods[i]] === 'function') {
        this.modelClass.prototype[modelMethods[i]] = this.model[modelMethods[i]].bind(this.model);
      }
    };

    this.modelClass.prototype['Query'] = this.model.Query;
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
    });
  }

  async create(doc){
    const model = new this.model({
      ...doc,
    });

    return await model.save();
  }

  async update(queryParams, newParams){
    await this.model.findOne({
      ...queryParams,
    })
    .then( async doc => {
      doc.set({
        ...newParams
      });

      return await doc.save();
    })
    .catch(err => {
      return Promise.reject(err)
    });
  }
}
