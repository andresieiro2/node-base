import BaseModel from './BaseModel';

class User extends BaseModel {
  constructor() {
    super(User);
  }

  customModelMethod() {
    console.log("Custom Method on Model");
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
    required: [true, 'Senha é obrigatório']
  },
  role: {
    type: Number,
    default: 1
  },
  token: String,
}

export default User ;
