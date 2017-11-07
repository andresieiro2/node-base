
const middleware = (ctx, next) => {
  if(ctx.request.method === "GET") {
    ctx.body = JSON.stringify(ctx.params);
  } else {
    ctx.body = JSON.stringify(ctx.request.body);
  }
  return next();
}


export default middleware;
