const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are mandatory!" });
  }
  const isUserAvailable = await User.findOne({ email, username });
  if (isUserAvailable) {
    return res.status(400).json({ msg: "usename/email already exits!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password:", hashedPassword);

  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res
      .status(200)
      .json({ user: { username: user.username, userId: user._id } });
    return;
  } else {
    res.status(400).json({ msg: error });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "Please provide a Username or Password" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ msg: "No user found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ msg: "Password is Incorrect" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.secret_key,
    { expiresIn: "1h" }
  );
  res.status(200).json({ user: { username: user.username }, token });
};

const getUser = (req, res) => {
  const { userId, username } = req.user;

  const currentUser = User.findOne({ _id: userId });
  res.status(200).json({
    user: { username: currentUser.username, email: currentUser.email },
  });
  //   res.json({ msg: "Current user" });
};

module.exports = { registerUser, signIn, getUser };
