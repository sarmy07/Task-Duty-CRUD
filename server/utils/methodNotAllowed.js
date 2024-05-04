const methodNotAllowed = (req, res) => {
  res.status(400).json({ msg: `Method ${req.method} not allowed` });
};

module.exports = methodNotAllowed;
