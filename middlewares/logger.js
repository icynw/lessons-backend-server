module.exports = (req, res, next) => {
  const method = req.method;
  const url = req.url;

  console.log(`method: ${method}, url: ${url}`);

  next();
};
