import mongoose from 'mongoose';

const BD = (params) => {
  mongoose.connect(`mongodb://${params.user}:${params.password}@localhost/${params.db}'` , { useMongoClient: true } );
}

export default BD;
