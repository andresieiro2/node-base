import BaseModel from './BaseModel';

class User extends BaseModel {
  constructor() {
    super();
    this.modelClass = User;
  }
}

User.fields = {
  name: {
    type: String,
    min: [3, 'Minimo de caracteres 3'],
    max: [12, 'Maximo de caracteres 12'],
    required: [true, 'Nome é obrigatório']
  },
  email: {
    type: String,
    min: [7, 'Minimo de caracteres 3'],
    required: [true, 'Email é obrigatório']
  },
  password: {
    type: String,
    min: [3, 'Minimo de caracteres 3'],
    max: [12, 'Maximo de caracteres 12'],
    required: [true, 'Senha é obrigatório'],
    select: false,
  },
  role: {
    type: Number,
    default: 1
  },
  token: {
    type: String,
    default: "",
  },
}

export default User ;
