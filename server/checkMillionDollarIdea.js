const {getFromDatabaseById} = require('./db.js');

const checkMillionDollarIdea = (req, res, next) => {
    // Check if ideaId is provided in the URL parameters
    if (req.params && req.params.ideaId !== undefined) {
        if (isNaN(Number(req.params.ideaId))) {
            return res.status(404).send('Invalid idea ID');
        }
        // in the case of a PUT request, we need to ensure that the ideaId is a number
        if(getFromDatabaseById('ideas', req.params.ideaId) === null || getFromDatabaseById('ideas', req.params.ideaId) === undefined) {
            return res.status(404).send('No ideas found');
        }
        // Check if the ideaId is a number
    }

    const numberOfWeeks = parseFloat(req.body.numWeeks);
    const weeklyRevenue = parseFloat(req.body.weeklyRevenue);
    // Check if numberOfWeeks and weeklyRevenue are defined
    if (numberOfWeeks === undefined || weeklyRevenue === undefined) {
        return res.status(400).send('Missing numberOfWeeks or weeklyRevenue');
    }

    /**
     * parseFloat() is used to convert a string to a floating-point number.
     * isNaN() checks if the value is NaN (Not-a-Number).
     * If either numberOfWeeks or weeklyRevenue is not a number, return a 400 status code with an error message.
     */
    // Validate that numberOfWeeks and weeklyRevenue are positive numbers
    if (isNaN(numberOfWeeks) || numberOfWeeks <= 0) {
        return res.status(400).send('numberOfWeeks must be a positive number');
    }
    if (isNaN(weeklyRevenue) || weeklyRevenue <= 0) {
        return res.status(400).send('weeklyRevenue must be a positive number');
    }
    if((numberOfWeeks * weeklyRevenue) < 1000000) {
        return res.status(400).send('Idea must be worth at least a million dollars');
    }
    
    next();
};




// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;