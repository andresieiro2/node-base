
const auth = (ctx, next) => {

  console.log('authetication sample');

  return next();

}

export default auth;
