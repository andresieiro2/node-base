import BaseModel from './BaseModel';

class ServiceType extends BaseModel {
  constructor() {
    super();
    this.modelClass = ServiceType;
  }
}

ServiceType.fields = {
  name: {
    type: String,
    required: [true, 'Nome é obrigatório']
  },
}

export default ServiceType ;
