 import BaseModel from './BaseModel';

class Service extends BaseModel {
  constructor() {
    super();
    this.modelClass = Service;
  }
}

Service.fields = {
  name: {
    type: String,
    min: [3, 'Minimo de caracteres 3'],
    max: [12, 'Maximo de caracteres 12'],
    required: [true, 'Nome é obrigatório']
  },
  description: {
    type: String,
    min: [3, 'Minimo de caracteres 3'],
    required: [true, 'Descricao é obrigatório']
  },
  slug: {
    type: String,
    required: [true, 'Slug é obrigatório']
  },
}

export default Service ;
