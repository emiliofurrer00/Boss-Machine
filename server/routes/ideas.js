const express = require('express');
const router = express.Router();
const { 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('../db');
const { route } = require('./minions');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

//GET an array of all ideas
router.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
});

router.param('ideaId', (req, res, next, id) => {
    const ideaId = id;
    const targetIdea = getFromDatabaseById('ideas', ideaId);
    if (targetIdea != -1 && !Number.isNaN(ideaId)) {
        req.body.targetIdea = targetIdea;
        req.body.ideaId = ideaId;
        next();
    }
    else {
        res.status(404).send();
    }
})

//GET a single idea for a given id
router.get('/:ideaId', (req, res, next) => {
    const { ideaId } = req.params;
    const retrievedIdea = getFromDatabaseById('ideas', ideaId);
    if (retrievedIdea){
        res.send(retrievedIdea);
    } else {
        res.status(404).send();
    }
});

//DELETE a single idea for a given id;
router.delete('/:ideaId', (req, res, next) => {
    const { ideaId } = req.params;
    const ideaToDelete = getFromDatabaseById('ideas', ideaId);
    if (ideaToDelete) {
        deleteFromDatabasebyId('ideas', ideaId);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

router.use(checkMillionDollarIdea);

//PUT <update> a single idea for a given id
router.put('/:ideaId', (req, res, next) => {
    const { ideaId, targetIdea } = req.body;
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    const updatedIdea = { id: ideaId, name, description, numWeeks, weeklyRevenue };
    updateInstanceInDatabase('ideas', updatedIdea);
    res.send(getFromDatabaseById('ideas', ideaId));
});

//POST a new idea
router.post('/', (req, res, next) => {
    const { name, description, numWeeks, weeklyRevenue} = req.body;
    const newIdea = { name, description, numWeeks, weeklyRevenue};
    try {
        addToDatabase('ideas', newIdea);
        res.status(201).send(newIdea)
    }
    catch(e){
        res.status(400).send(e.message)
    }
    
});

module.exports = router;