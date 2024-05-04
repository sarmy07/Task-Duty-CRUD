const errorHandler = (error, req, res, next) => {
  if (error.errors.title) {
    return res.status(400).json({ msg: error.errosr.title.message });
  }
  if (error.errors.description) {
    return res.status(400).json({ msg: error.errors.description.message });
  }
  if (error.errors.tag) {
    return res.status(400).json({ msg: error.errors.tag.message });
  }
  res.status(400).json({ msg: "something went wrong" });
};

module.exports = errorHandler;
