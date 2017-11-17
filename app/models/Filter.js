import BaseModel from './BaseModel';
import mongoose from 'mongoose';
const Schema =  mongoose.Schema;

class Filter extends BaseModel {
  constructor() {
    super();
    this.modelClass = Filter;
  }
}

Filter.fields = {
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  serviceType: {
    type: Schema.Types.ObjectId ,
    ref: 'ServiceType',
    required: [true, 'Serviço é obrigatório'],
    // autopopulate: true,
  },
}

export default Filter ;
