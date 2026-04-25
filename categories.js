const express = require('express');
const router = express.Router();

const CATEGORIES = [
  {
    id: 'family',
    name: 'قضايا عائلية',
    icon: '👨‍👩‍👧',
    desc: 'طلاق، حضانة، نفقة، زواج، ميراث',
    color: '#E1F5EE',
    accent: '#0F6E56',
  },
  {
    id: 'labor',
    name: 'قضايا عمالية',
    icon: '💼',
    desc: 'فصل تعسفي، رواتب، مكافأة نهاية الخدمة',
    color: '#E6F1FB',
    accent: '#185FA5',
  },
  {
    id: 'criminal',
    name: 'قضايا جنائية',
    icon: '⚖️',
    desc: 'سرقة، احتيال، اعتداء، شيكات بدون رصيد',
    color: '#FCEBEB',
    accent: '#A32D2D',
  },
  {
    id: 'real_estate',
    name: 'قضايا عقارية',
    icon: '🏠',
    desc: 'إيجارات، بيع وشراء، نزاعات ملكية',
    color: '#FAEEDA',
    accent: '#854F0B',
  },
  {
    id: 'commercial',
    name: 'قضايا تجارية',
    icon: '🏢',
    desc: 'شركات، عقود، ديون، شراكات',
    color: '#FBEAF0',
    accent: '#993556',
  },
];

// GET /api/categories
router.get('/', (req, res) => {
  res.json({ success: true, data: CATEGORIES });
});

module.exports = router;
module.exports.CATEGORIES = CATEGORIES;
