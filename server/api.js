const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const app = require('../server');

apiRouter.get('/minions', (req, res, next) => {
 const allMinions = getAllFromDatabase('minions');
 if(allMinions === null) {
  return res.status(404).send('No minions found');
 }
 res.status(200).send(allMinions);
});


apiRouter.post('/minions', (req, res, next) => {

    const minionObject = req.body;
    const addedMinion = addToDatabase('minions', minionObject);
    if(addedMinion === null) {
        return res.status(404).send('No minions found');
    }else {
        res.status(201).send(`Added minion with name: ${addedMinion.name} ,id: ${addedMinion.id}, weakness: ${addedMinion.weakness} and salary: ${addedMinion.salary}`);
    }
});


apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = getFromDatabaseById('minions', minionId);
    if(minion === null) {
        return res.status(404).send('No minions found');        
    }else{
        res.status(200).send(minion);
    }
}
);

apiRouter.put('/api/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minionObject = req.body;
    minionObject.id = minionId;
    const newMinion = updateInstanceInDatabase('minions', minionObject);
    if(newMinion === null) {
        return res.status(404).send('No minions found');
    }
    res.status(200).send(`Updated minion with name: ${newMinion.name} ,id: ${newMinion.id}, weakness: ${newMinion.weakness} and salary: ${newMinion.salary}`);

});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const deletedStatus = deleteFromDatabasebyId('minions', minionId);
    if(deletedStatus === null || deletedStatus === false) {
        return res.status(404).send('No minions found');
    }else{
        res.status(200).send(`Deleted minion with id: ${minionId}`);
    }
});


apiRouter.get('/api/ideas', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if(allIdeas === null) {
        return res.status(404).send('No ideas found');
    }
    res.status(200).send(allIdeas);
});



module.exports = apiRouter;
 