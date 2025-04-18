const express = require('express');
const apiRouter = express.Router();
const {deleteAllFromDatabase,createMeeting, getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');


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
        res.status(201).send(addedMinion);
    }
});


apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    if (isNaN(minionId)) {
    return res.status(404).send('Invalid minion ID');
    }
    const minion = getFromDatabaseById('minions', minionId);
    if(minion === null || minion === undefined) {
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
    res.status(200).send(newMinion);

});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const deletedStatus = deleteFromDatabasebyId('minions', minionId);
    if(deletedStatus === null || deletedStatus === false) {
        return res.status(404).send('No minions found');
    }else{
        res.status(204).send();
    }
});


apiRouter.get('/ideas', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if(allIdeas === null) {
        return res.status(404).send('No ideas found');
    }
    res.status(200).send(allIdeas);
});

apiRouter.post('/ideas',checkMillionDollarIdea, (req, res) => {
    const ideaObject = req.body;
    const addedIdea = addToDatabase('ideas', ideaObject);
    if(addedIdea === null) {
        return res.status(404).send('No ideas found');
    }else {
        res.status(201).send(`Added idea with title: ${addedIdea.title} ,id: ${addedIdea.id}, description: ${addedIdea.description} and content: ${addedIdea.content}`);
    }

});

apiRouter.get('/ideas/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    if (isNaN(ideaId)) {
        return res.status(404).send('Invalid idea ID');
    }
    const ideaObject = getFromDatabaseById('ideas', ideaId);
    if(ideaObject === null || ideaObject === undefined) {
        return res.status(404).send('No ideas found');
    }else{
        res.status(200).send(ideaObject);
    }
});

apiRouter.put('/ideas/:ideaId',checkMillionDollarIdea, (req, res) => {
    const ideaId = req.params.ideaId;
    /** 
     * if (isNaN(Number(ideaId))) {
        return res.status(404).send('Invalid idea ID');
    }
    */
    
    const ideaObject = req.body;
    ideaObject.id = ideaId;
    const newIdea = updateInstanceInDatabase('ideas', ideaObject);
    if(newIdea === null || newIdea === undefined) {
        return res.status(404).send('No ideas found');
    }
    res.status(200).send(newIdea);
}
);  

apiRouter.delete('/ideas/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const deletedStatus = deleteFromDatabasebyId('ideas', ideaId);
    if(deletedStatus === null || deletedStatus === false) {
        return res.status(404).send('No ideas found');
    }else{
        res.status(200).send(`Deleted idea with id: ${ideaId}`);
    }
}
);  


apiRouter.get('/meetings', (req, res) => {
    const allMeetings = getAllFromDatabase('meetings');
    if(allMeetings === null) {
        return res.status(404).send('No meetings found');
    }
    res.status(200).send(allMeetings);
});

apiRouter.post('/meetings', (req, res) => {
    const meetingObject = createMeeting();
    const addedMeeting = addToDatabase('meetings', meetingObject);
    if(addedMeeting === null) {
        return res.status(404).send('No meetings found');
    }else {
        res.status(201).send(`Added meeting with title: ${addedMeeting.title} ,id: ${addedMeeting.id}, description: ${addedMeeting.description} and content: ${addedMeeting.content}`);
    }

}
);

apiRouter.delete('/meetings' , (req, res) => {
    const deletedStatus = deleteAllFromDatabase('meetings');
    if(deletedStatus === null) {
        return res.status(404).send('No meetings found');
    }else{
        res.status(200).send(`Deleted all meeting`);
    }           
});


apiRouter.get('/minions/:minionId/work', (req, res) => {
    const minionId = req.params.minionId;
    // since we have the minionId we can get the work of the minion
    const allMinionWork = getAllFromDatabase('work');
    if(allMinionWork === null) {
        return res.status(404).send('No work found');
    }
    // filter the work of the minion
    const minionWork = allMinionWork.filter(work => work.minionId === minionId);
    if(minionWork.length === 0) {
        return res.status(404).send('No work found for the minion');
    }
    res.status(200).send(minionWork);
});

apiRouter.post('/minions/:minionId/work', (req, res) => {
    const minionId = req.params.minionId;
    const workObject = req.body;
    workObject.minionId = minionId;
    const addedWork = addToDatabase('work', workObject);
    if(addedWork === null) {
        return res.status(404).send('No work found');
    }else {
        res.status(201).send(`Added work with title: ${addedWork.title} ,id: ${addedWork.id}, description: ${addedWork.description} and content: ${addedWork.content}`);
    }
});

apiRouter.put('/minions/:minionId/work/:workId', (req, res) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;
    const workObject = req.body;
    workObject.minionId = minionId;
    workObject.id = workId;
    const newWork = updateInstanceInDatabase('work', workObject);
    if(newWork === null) {
        return res.status(404).send('No work found');
    }
    res.status(200).send(`Updated work with title: ${newWork.title} ,id: ${newWork.id}, description: ${newWork.description} for minion with id: ${minionId} `);
});

apiRouter.get('/work', (req, res) => {
    const allWork = getAllFromDatabase('work');
    if(allWork === null) {
        return res.status(404).send('No work found');
    }
    res.status(200).send(allWork);
}
);  

apiRouter.delete('/minions/:minionId/work/:workId', (req, res) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;
    const deletedStatus = deleteFromDatabasebyId('work', workId);
    if(deletedStatus === null || deletedStatus === false) {
        return res.status(404).send('No work found');
    }else{
        res.status(200).send(`Deleted work with id: ${workId} for minion with id: ${minionId}`);
    }
}
);


module.exports = apiRouter;
 