const checkLoggedIn = (ctx, next) => {
  console.log('검증', ctx.state.user);
  if (!ctx.state.user) {
    ctx.status = 401; // Unauthorized
    return;
  }
  return next();
};

export default checkLoggedIn;
