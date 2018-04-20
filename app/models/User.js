import BaseModel from './BaseModel';
import mongoose from 'mongoose';

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
    required: [true, 'Nome é obrigatório']
  },
  email: {
    type: String,
    min: [7, 'Minimo de caracteres 3'],
    required: [true, 'Email é obrigatório'],
  },
  password: {
    type: String,
    min: [3, 'Minimo de caracteres 3'],
    required: [true, 'Senha é obrigatório'],
    bcrypt: true
  },
  role: {
    type: Number,
    default: 1
  },
}

export default new User() ;
