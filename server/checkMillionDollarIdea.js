const checkMillionDollarIdea = (req, res, next) => {
    const {numberOfWeeks, weeklyRevenue} = req.body;
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
    if (
        typeof numberOfWeeks !== 'number' || 
        typeof weeklyRevenue !== 'number' || 
        numberOfWeeks <= 0 || 
        weeklyRevenue <= 0
    ) {
        return res.status(400).send('numberOfWeeks and weeklyRevenue must be positive numbers');
    }
    if(numberOfWeeks * weeklyRevenue >= 1000000) {
        return next();
    }else {
        return res.status(400).send('Idea must be worth at least a million dollars');
    }
};




// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
