import BaseModel from './BaseModel';
import mongoose from 'mongoose';

const Schema =  mongoose.Schema;

class ServiceFilter extends BaseModel {
  constructor() {
    super();
    this.modelClass = ServiceFilter;
  }
}

ServiceFilter.fields = {
  service: {
    type: Schema.Types.ObjectId ,
    ref: 'Service',
    required: [true, 'Serviço é obrigatório'],
    autopopulate: true,
  },
  filter: {
    type: Schema.Types.ObjectId ,
    ref: 'Filter',
    required: [true, 'Filtro é obrigatório'],
    // autopopulate: true,
  }
}

export default ServiceFilter ;
