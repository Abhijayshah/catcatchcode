const express = require('express');
const router = express.Router();
const {
  getDashboardData,
  addTodo,
  toggleTodo,
  deleteTodo,
  addDeadline,
  deleteDeadline,
  seedDashboard,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getDashboardData);
router.post('/seed', protect, seedDashboard);

router.route('/todos')
  .post(protect, addTodo);
router.route('/todos/:id')
  .put(protect, toggleTodo)
  .delete(protect, deleteTodo);

router.route('/deadlines')
  .post(protect, addDeadline);
router.route('/deadlines/:id')
  .delete(protect, deleteDeadline);

module.exports = router;
