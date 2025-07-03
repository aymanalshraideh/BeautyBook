const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // auto-type cast
    next();
  } catch (err) {
    res.status(400).json({
      error: 'Validation error',
      details: err.errors,
    });
  }
};

module.exports = validate;
