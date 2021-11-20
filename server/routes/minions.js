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

//Handling minionId param for a cleaner and reusable code
router.param('minionId', (req, res, next, id) => {
    const minionId = id;
    const minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.body.targetMinion = minion;
        req.body.minionId = minionId
        next();
    } else {
        res.status(404).send()
    }
})


//GET a single minion by id
router.get('/:minionId', (req, res, next) => {
    const { minionId, targetMinion } = req.body;
    res.send(targetMinion)
})

//PUT <update> a single minion by id
router.put('/:minionId', (req, res, next) => {
    const { minionId, targetMinion } = req.body;
    const { name, title, salary, weaknesses } = req.body;
    if (targetMinion && name && title && salary && weaknesses) {
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
    const { minionId } = req.body;
    deleteFromDatabasebyId('minions', minionId);
    res.status(204).send();
})

router.get('/:minionId/work', (req, res, next) => {
    const { minionId } = req.body;
    res.send(getAllFromDatabase('work').filter(work => work.minionId === minionId))
});

router.post('/:minionId/work', (req, res, next) => {
    const { minionId, title, description, hours } = req.body;
    if (title, description, hours){
        const newWork = {
            title,
            description,
            hours,
            minionId
        };
        addToDatabase('work', newWork);
        res.status(201).send(newWork);
    } else {
        res.send(404).send();
    }
});

router.put('/:minionId/work/:workId', (req, res, next) => {
    const { minionId, title, description, hours } = req.body;
    const { workId } = req.params;
    const targetWork = getFromDatabaseById('work', workId);
    const targetMinion = getFromDatabaseById('minions', minionId);
    if (targetWork !== -1 && targetMinion !== -1 && title && description && hours){
        const updatedWork = {
            id: workId,
            title,
            description,
            hours,
            minionId
        };
        updateInstanceInDatabase('work', updatedWork);
        res.send(updatedWork)
    } else {
        res.send(404).send();
    }
})


// Work schema
// id: string
// title: string
// description: string
// hours: number
// minionId: string

module.exports = router;