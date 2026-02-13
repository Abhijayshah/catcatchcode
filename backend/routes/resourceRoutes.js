const express = require('express');
const router = express.Router();
const {
  getResources,
  addResource,
  updateResource,
  deleteResource,
  extractInfo,
} = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/extract', protect, extractInfo);
router.route('/').get(protect, getResources).post(protect, addResource);
router.route('/:id').put(protect, updateResource).delete(protect, deleteResource);

module.exports = router;
