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

//GET an array of all ideas
router.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
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

//PUT <update> a single idea for a given id
router.put('/:ideaId', (req, res, next) => {
    const { ideaId } = req.params;
    const ideaToUpdate = getFromDatabaseById('ideas', ideaId);
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    if (ideaToUpdate) {
        const updatedIdea = { id: ideaId, name, description, numWeeks, weeklyRevenue };
        try {
            updateInstanceInDatabase('ideas', updatedIdea);
            res.send(updatedIdea)
        }
        catch(e){
            res.status(400).send(e.message)
        } 
    } else {
        res.status(404).send()
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

module.exports = router;