const User = require('../models/User');
const Payment = require('../models/Payment');
const Course = require('../models/Course');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalCourses = await Course.countDocuments();
    
    // Payment Stats
    const approvedPayments = await Payment.find({ status: 'approved' });
    const pendingPayments = await Payment.countDocuments({ status: 'pending' });
    
    const totalRevenue = approvedPayments.reduce((acc, curr) => acc + curr.amount, 0);
    
    // Calculate Monthly Revenue (Simple)
    const currentMonth = new Date().getMonth();
    const monthlyRevenue = approvedPayments
      .filter(p => new Date(p.createdAt).getMonth() === currentMonth)
      .reduce((acc, curr) => acc + curr.amount, 0);

    // Active Subscribers (Users who have bought at least one course)
    const uniqueBuyers = new Set(approvedPayments.map(p => p.user.toString()));
    const activeSubscribers = uniqueBuyers.size;

    // Recent Transactions (Last 5)
    const recentTransactions = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .populate('course', 'title');

    res.json({
      totalUsers,
      totalCourses,
      totalRevenue,
      monthlyRevenue,
      activeSubscribers,
      pendingPayments,
      recentTransactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Block/Unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
const updateUserBlockStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isBlocked = !user.isBlocked;
            await user.save();
            res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserBlockStatus
};
