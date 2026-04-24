require('dotenv').config();
const mongoose = require('mongoose');
const Lawyer = require('./models/Lawyer');

const SEED_DATA = [
  { name: 'المحامي أحمد الخالدي', phone: '0791234567', category: 'family', reveals: 2 },
  { name: 'المحامي سامر العمري', phone: '0792345678', category: 'family', reveals: 5 },
  { name: 'المحامي خالد النجار', phone: '0793456789', category: 'family', reveals: 1 },
  { name: 'المحامية ريم الحسن', phone: '0794567890', category: 'family', reveals: 8 },
  { name: 'المحامي محمود العبادي', phone: '0795678901', category: 'family', reveals: 3 },
  { name: 'المحامي علي الزعبي', phone: '0796789012', category: 'labor', reveals: 0 },
  { name: 'المحامية سناء المجالي', phone: '0797890123', category: 'labor', reveals: 4 },
  { name: 'المحامي طارق البطاينة', phone: '0798901234', category: 'labor', reveals: 6 },
  { name: 'المحامية هالة الرشيد', phone: '0799012345', category: 'criminal', reveals: 2 },
  { name: 'المحامي نايف الشرعة', phone: '0791123456', category: 'criminal', reveals: 0 },
  { name: 'المحامي باسل الطراونة', phone: '0792234567', category: 'real_estate', reveals: 3 },
  { name: 'المحامية منى الدباس', phone: '0793345678', category: 'real_estate', reveals: 1 },
  { name: 'المحامي حسن الشوابكة', phone: '0794456789', category: 'commercial', reveals: 7 },
  { name: 'المحامية لينا الزيود', phone: '0795567890', category: 'commercial', reveals: 2 },
  { name: 'المحامي وليد القضاة', phone: '0796678901', category: 'commercial', reveals: 0 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mizan');
  console.log('✅ متصل بقاعدة البيانات');
  await Lawyer.deleteMany({});
  await Lawyer.insertMany(SEED_DATA);
  console.log(`✅ تم إضافة ${SEED_DATA.length} محامٍ`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
