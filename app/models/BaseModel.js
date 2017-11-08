import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default class BaseModel {
  static prefixModel = "";
  static modelClass = "";
  static modelSchema;
  static model;

  constructor(modelClass) {
    this.modelClass = modelClass;
    this.setSchema();
  }

  setSchema() {
    const methods = Object.getOwnPropertyNames(this.modelClass.prototype).filter(x => x !== 'constructor')
    this.modelSchema = new Schema({
      id: Schema.ObjectId,
      ...this.modelClass.fields
    });

    for (var i = 0 ; i < methods.length ; i++ ) {
      this.modelSchema.statics[methods[i]] = this.modelClass.prototype[methods[i]];
    }

    mongoose.model(this.modelClass.name, this.modelSchema);
    this.model = mongoose.model(this.modelClass.name);
  }

}
