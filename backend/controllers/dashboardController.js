const asyncHandler = require('express-async-handler');
const Todo = require('../models/Todo');
const Deadline = require('../models/Deadline');
const UserStats = require('../models/UserStats');

// @desc    Get dashboard data (todos, deadlines, stats)
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  const deadlines = await Deadline.find({ user: req.user._id }).sort({ date: 1 });
  let stats = await UserStats.findOne({ user: req.user._id });

  if (!stats) {
    // Create default stats if not exists
    stats = await UserStats.create({
      user: req.user._id,
      streak: 1,
      productivityScore: 75,
      dailyGoal: 2,
      dailyProgress: 0,
      subjectProgress: [
        { subject: 'React', progress: 40 },
        { subject: 'Node.js', progress: 20 }
      ]
    });
  }

  res.json({ todos, deadlines, stats });
});

// @desc    Add Todo
// @route   POST /api/dashboard/todos
// @access  Private
const addTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.create({
    user: req.user._id,
    text,
  });
  res.status(201).json(todo);
});

// @desc    Toggle Todo
// @route   PUT /api/dashboard/todos/:id
// @access  Private
const toggleTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Todo not found');
  }
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// @desc    Delete Todo
// @route   DELETE /api/dashboard/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Todo not found');
  }
  await todo.deleteOne();
  res.json({ id: req.params.id });
});

// @desc    Add Deadline
// @route   POST /api/dashboard/deadlines
// @access  Private
const addDeadline = asyncHandler(async (req, res) => {
  const { title, date, type } = req.body;
  const deadline = await Deadline.create({
    user: req.user._id,
    title,
    date,
    type,
  });
  res.status(201).json(deadline);
});

// @desc    Delete Deadline
// @route   DELETE /api/dashboard/deadlines/:id
// @access  Private
const deleteDeadline = asyncHandler(async (req, res) => {
  const deadline = await Deadline.findById(req.params.id);
  if (!deadline || deadline.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Deadline not found');
  }
  await deadline.deleteOne();
  res.json({ id: req.params.id });
});

// @desc    Seed Dummy Data
// @route   POST /api/dashboard/seed
// @access  Private
const seedDashboard = asyncHandler(async (req, res) => {
  // Clear existing
  await Todo.deleteMany({ user: req.user._id });
  await Deadline.deleteMany({ user: req.user._id });
  await UserStats.deleteMany({ user: req.user._id });

  // Add Todos
  await Todo.create([
    { user: req.user._id, text: 'Review React Hooks', completed: false },
    { user: req.user._id, text: 'Complete Lab Assignment 3', completed: true },
    { user: req.user._id, text: 'Read System Design Chapter 4', completed: false },
  ]);

  // Add Deadlines
  const today = new Date();
  await Deadline.create([
    { user: req.user._id, title: 'React Final Project', date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), type: 'project' },
    { user: req.user._id, title: 'Data Structures Quiz', date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), type: 'exam' },
  ]);

  // Add Stats
  await UserStats.create({
    user: req.user._id,
    streak: 12,
    productivityScore: 85,
    dailyGoal: 3,
    dailyProgress: 1.5,
    subjectProgress: [
      { subject: 'React', progress: 75 },
      { subject: 'Node.js', progress: 45 },
      { subject: 'MongoDB', progress: 30 },
      { subject: 'Design', progress: 90 },
    ]
  });

  res.json({ message: 'Dashboard seeded with dummy data' });
});

module.exports = {
  getDashboardData,
  addTodo,
  toggleTodo,
  deleteTodo,
  addDeadline,
  deleteDeadline,
  seedDashboard,
};
