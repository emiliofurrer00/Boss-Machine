const express = require('express');
const router = express.Router();
const { 
    getAllFromDatabase, 
    addToDatabase,
    createMeeting,
    deleteAllFromDatabase
} = require('../db');

router.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
});

router.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting)
});

router.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send()
});

module.exports = router;