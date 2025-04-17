const express = require('express');
const apiRouter = express.Router();
const {deleteAllFromDatabase, getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const app = require('../server');
const e = require('express');

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

apiRouter.put('/minions/:minionId', (req, res, next) => {
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


apiRouter.get('/ideas', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if(allIdeas === null) {
        return res.status(404).send('No ideas found');
    }
    res.status(200).send(allIdeas);
});

app.post('/ideas', (req, res) => {
    const ideaObject = req.body;
    const addedIdea = addToDatabase('ideas', ideaObject);
    if(addedIdea === null) {
        return res.status(404).send('No ideas found');
    }else {
        res.status(201).send(`Added idea with title: ${addedIdea.title} ,id: ${addedIdea.id}, description: ${addedIdea.description} and content: ${addedIdea.content}`);
    }

});

app.get('/ideas/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const ideaObject = getFromDatabaseById('ideas', ideaId);
    if(ideaObject === null) {
        return res.status(404).send('No ideas found');
    }else{
        res.status(200).send(ideaObject);
    }
});

app.put('/ideas/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const ideaObject = req.body;
    ideaObject.id = ideaId;
    const newIdea = updateInstanceInDatabase('ideas', ideaObject);
    if(newIdea === null) {
        return res.status(404).send('No ideas found');
    }
    res.status(200).send(`Updated idea with title: ${newIdea.title} ,id: ${newIdea.id}, description: ${newIdea.description} and content: ${newIdea.content}`);
}
);  

app.delete('/ideas/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const deletedStatus = deleteFromDatabasebyId('ideas', ideaId);
    if(deletedStatus === null || deletedStatus === false) {
        return res.status(404).send('No ideas found');
    }else{
        res.status(200).send(`Deleted idea with id: ${ideaId}`);
    }
}
);  


app.get('/meetings', (req, res) => {
    const allMeetings = getAllFromDatabase('meetings');
    if(allMeetings === null) {
        return res.status(404).send('No meetings found');
    }
    res.status(200).send(allMeetings);
});

app.post('/meetings', (req, res) => {
    const meetingObject = req.body;
    const addedMeeting = addToDatabase('meetings', meetingObject);
    if(addedMeeting === null) {
        return res.status(404).send('No meetings found');
    }else {
        res.status(201).send(`Added meeting with title: ${addedMeeting.title} ,id: ${addedMeeting.id}, description: ${addedMeeting.description} and content: ${addedMeeting.content}`);
    }

}
);

app.delete('/meetings' , (req, res) => {
    const deletedStatus = deleteAllFromDatabase('meetings');
    if(deletedStatus === null) {
        return res.status(404).send('No meetings found');
    }else{
        res.status(200).send(`Deleted all meeting`);
    }           
});


module.exports = apiRouter;
 