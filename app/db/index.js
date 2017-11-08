import mongoose from 'mongoose';
import Models from './../models';

const BD = (params) => {
  mongoose.Promise = global.Promise;

  mongoose
  .connect(
    `mongodb://localhost/${params.db}` ,
    {
      useMongoClient: true ,
      user: params.user,
      pass: params.password
    }
  );

  Models.init();
}

export default BD;
