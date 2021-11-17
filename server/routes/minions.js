const express = require('express')
const router = express.Router();
const { 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('../db')

//PARAMS validating minionId param to avoid code repetition where required
// router.param('minionId', (req, res, next, id) => {
//     const minionId = id;

// })


//GET all minions
router.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
});
//POST a new minion 
router.post('/', (req, res, next) => {
    const { name, title, salary, weaknesses } = req.body;
    if ( name !== null && title !== null && salary !== null && weaknesses !== null ) {
        const newMinion = { name, title, salary, weaknesses };
        addToDatabase('minions', newMinion);
    res.status(201).send(newMinion);
    } else {
        res.status(400).send()
    }
})
//GET a single minion by id
router.get('/:minionId', (req, res, next) => {
    const { minionId } = req.params;
    const minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        res.send(minion)
    } else {
        res.status(404).send()
    }
})
//PUT <update> a single minion by id
router.put('/:minionId', (req, res, next) => {
    const { minionId } = req.params;
    const { name, title, salary, weaknesses } = req.body;
    const minionToUpdate = getFromDatabaseById('minions', minionId);
    if (minionToUpdate && name && title && salary && weaknesses) {
        const updatedMinion = {
            id: minionId,
            name,
            title,
            salary,
            weaknesses
        };
        updateInstanceInDatabase('minions', updatedMinion);
        res.send(updatedMinion)
    } else {
        res.status(404).send();
    }
});
//DELETE a single minion by id
router.delete('/:minionId', (req, res, next) => {
    const { minionId } = req.params;
    const minionToDelete = getFromDatabaseById('minions', minionId);
    if (minionToDelete) {
        deleteFromDatabasebyId('minions', minionId);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


module.exports = router;