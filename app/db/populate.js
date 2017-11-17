import mongoose from 'mongoose';


const populate = async (modelname, fields) => {
  let modelClass = mongoose.model(modelname);
  let promises = [];

  for (let i = 0; i < fields.length; i++) {
    let model = new modelClass(fields[i]);
    promises.push( Promise.resolve( model.save() ) );
  }

  return Promise.all(promises);
}

export default populate;
