require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mizan';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/lawyers', require('./routes/lawyers'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'منصة ميزان تعمل بشكل صحيح ✅' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'المسار غير موجود' });
});

// Connect to MongoDB then start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ متصل بقاعدة البيانات MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
      console.log(`📡 http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
    process.exit(1);
  });
