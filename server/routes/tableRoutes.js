const express = require('express');
const {
    getTables,
    getTable,
    createTable,
    updateTable,
    deleteTable,
} = require('../controllers/tableController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTables)
    .post(protect, authorize('admin'), createTable);

router.route('/:id')
    .get(getTable)
    .put(protect, authorize('staff', 'admin'), updateTable)
    .delete(protect, authorize('admin'), deleteTable);

module.exports = router;
