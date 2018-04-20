import mongoose from 'mongoose';

const BD = (params) => {
  mongoose.Promise = global.Promise;

  mongoose
  .connect(
    `mongodb://${params.host}/${params.db}` ,
    {
      user: params.user,
      pass: params.password
    }
  );
}

export default BD;
