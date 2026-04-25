const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');

// GET /api/lawyers?category=family&limit=5
router.get('/', async (req, res) => {
  try {
    const { category, limit } = req.query;
    const filter = {};
    if (category) filter.category = category;

    let query = Lawyer.find(filter).sort({ reveals: 1, createdAt: 1 });
    if (limit) query = query.limit(parseInt(limit));

    const lawyers = await query.exec();

    // Mask phone numbers
    const masked = lawyers.map((l) => ({
      _id: l._id,
      name: l.name,
      phone: l.phone.slice(0, 5) + '****' + l.phone.slice(-2),
      category: l.category,
      reveals: l.reveals,
      createdAt: l.createdAt,
    }));

    res.json({ success: true, data: masked });
  } catch (err) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});

// POST /api/lawyers
router.post('/', async (req, res) => {
  try {
    const { name, phone, category } = req.body;
    const lawyer = new Lawyer({ name, phone, category });
    await lawyer.save();
    res.status(201).json({ success: true, message: 'تم تسجيل المحامي بنجاح', data: { _id: lawyer._id, name, category } });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});

// PATCH /api/lawyers/reveal/:id
router.patch('/reveal/:id', async (req, res) => {
  try {
    const lawyer = await Lawyer.findByIdAndUpdate(
      req.params.id,
      { $inc: { reveals: 1 } },
      { new: true }
    );
    if (!lawyer) return res.status(404).json({ success: false, message: 'المحامي غير موجود' });

    res.json({ success: true, phone: lawyer.phone, reveals: lawyer.reveals });
  } catch (err) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});

module.exports = router;
