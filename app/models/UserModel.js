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
  name: String,
}

export default User ;
