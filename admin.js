const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const totalLawyers = await Lawyer.countDocuments();
    const totalReveals = await Lawyer.aggregate([
      { $group: { _id: null, total: { $sum: '$reveals' } } },
    ]);

    const byCategory = await Lawyer.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalReveals: { $sum: '$reveals' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const topLawyers = await Lawyer.find()
      .sort({ reveals: -1 })
      .limit(10)
      .select('name category reveals');

    res.json({
      success: true,
      data: {
        totalLawyers,
        totalReveals: totalReveals[0]?.total || 0,
        byCategory,
        topLawyers,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});

// GET /api/admin/lawyers  (full list with real phones)
router.get('/lawyers', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const lawyers = await Lawyer.find(filter).sort({ category: 1, reveals: 1 });
    res.json({ success: true, data: lawyers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});

module.exports = router;
