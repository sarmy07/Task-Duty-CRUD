const Task = require("../models/Task");
const mongoose = require("mongoose");
//

const getAllTasks = async (req, res) => {
  const user_id = req.user.userId;
  const tasks = await Task.find({ user_id });
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  req.body.user_id = req.user.userId;
  try {
    const { title, description, tags } = req.body;

    if (!title || !description || !tags) {
      return res.status(400).json({ msg: "All fields are mandatory!" });
    }
    const task = await Task.create({ ...req.body });
    res.status(200).json({ task });
    return;
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(403).json({ msg: "No Such Task" });
  }

  const task = await Task.findById({ _id: id });
  if (!task) {
    res.status(400).json({ msg: `No task with ID: ${id} found` });
    return;
  }
  res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, tag } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(403).json({ msg: "No Such Task" });
  }

  const task = await Task.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    {
      new: true,
    }
  );
  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(403).json({ msg: "No Such Task" });
  }
  try {
    const task = await Task.findByIdAndDelete({ _id: id });
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
