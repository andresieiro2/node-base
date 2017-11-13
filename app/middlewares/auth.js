
import mongoose from 'mongoose';

const auth = async (ctx, next) => {
  const user =  mongoose.model("User");
  const token = ctx.header.authorization.split('Basic')[1].trim();

  const resultuser = await user.find({token: token})
  .then( doc => {
    if(doc.length > 0){
      return next();
    } else {
      ctx.status = 401;
    }
  })
  .catch( err => {
    ctx.status = 400;
  })
}

export default auth;
