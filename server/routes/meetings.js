const express = require('express');
const router = express.Router();
const { 
    getAllFromDatabase, 
    addToDatabase,
    deleteAllFromDatabase
} = require('../db');

router.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
});

module.exports = router;