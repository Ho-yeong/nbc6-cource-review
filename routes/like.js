const express = require('express');
const { Like } = require('../models');
const router = express.Router();

// 좋아요 and 취소
router.post('/', (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
