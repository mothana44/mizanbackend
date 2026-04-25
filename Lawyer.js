const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'الاسم مطلوب'],
      trim: true,
      minlength: [5, 'الاسم يجب أن يكون 5 أحرف على الأقل'],
    },
    phone: {
      type: String,
      required: [true, 'رقم الهاتف مطلوب'],
      match: [/^07\d{8}$/, 'رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أرقام'],
    },
    category: {
      type: String,
      required: [true, 'التصنيف مطلوب'],
      enum: {
        values: ['family', 'labor', 'criminal', 'real_estate', 'commercial'],
        message: 'التصنيف غير صحيح',
      },
    },
    reveals: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lawyer', lawyerSchema);
