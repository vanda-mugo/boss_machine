/**
 * this is a mock database implementation for the boss machine project. It provides and in memory storage and utility function 
 * to manage data for different entities such as minions, ideas, work, and meetings.
 */

const faker = require('faker');// library used to generate random realistic lookinf data for entries
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js'); // this is a middleware that checks if the idea is worth a million dollars
// this is a middleware that checks if the idea is worth a million dollars

let minionIdCounter = 1;

/**
 * 
 * @returns {Object} a minion object with random properties such as name, title, weaknesses, and salary
 */

const createMinion = () => {
  const weaknesses = new Array(3).fill(0).map(() => {
    const reasons = ['Cannot do', 'Unable to execute', 'Will not build'];
    const reason = reasons[Math.floor(Math.random() * reasons.length)];
    const adj = faker.company.bsAdjective();
    const noun = faker.company.catchPhraseNoun();
    return `${reason} ${adj} ${noun}`;
  })
  .join(', ') + ', too ' + faker.hacker.adjective()

  return {
    id: `${minionIdCounter++}`,
    name: faker.name.findName(),
    title: faker.name.jobTitle(),
    weaknesses: weaknesses,
    salary: 40000,
  }
};

let workIdCounter = 1;

/**
 * 
 * @param {string} minionId : {String} the id of the minion that this work is related to
 * @returns : {Object} a work object with random properties such as title, description, hours, and minionId. 
 * this is related to a specific minion
 * 
 */

const createWork = (minionId) => {
  return {
    id: `${workIdCounter++}`,
    title: `Close deal #${Math.floor(Math.random() * 4) + 3}`,
    description: 'Close the biggest deal!',
    hours: Math.floor(Math.random() * 8) + 1,
    minionId: `${minionId}`,
  }
};

let ideaIdCounter = 1;
const companies = [
  'Codecademy',
  'Uber',
  'Snapchat',
  'Facebook',
  'Microservices',
  'Pets.com',
];


/**
 * 
 * @returns {Object} an idea object with random properties such as name, description, weeklyRevenue, and numWeeks
 */
const createIdea = () => {
  const noun = faker.company.bsNoun();
  const name = companies[Math.floor(Math.random() * companies.length)];
  let weeklyRevenue = 0;
  let numWeeks = 0;
  while (weeklyRevenue * numWeeks < 1000000) {
    weeklyRevenue = Math.floor(Math.random() * 123562);
    numWeeks = Math.floor(Math.random() * 104) + 6;
  }

  return {
    id: `${ideaIdCounter++}`,
    name: `${name} but for ${noun}`,
    description: 'The name says it all!!!',
    weeklyRevenue: weeklyRevenue,
    numWeeks: numWeeks,
  }
};

let meetingIdCounter = 1;

/**
 * 
 * @returns {Object} a meeting object with random properties such as time, date, day, and note
 */
const createMeeting = () => {
  const options = [`Discussion about`, `Meeting for`, `Brainstorm`];
  const option = options[Math.floor(Math.random() * options.length)];
  const date = new Date(faker.date.future());
  return {
    id: `${meetingIdCounter++}`,
    time: date.toTimeString().slice(0, 5),
    date: date,
    day: date.toDateString(),
    note: `${option} ${faker.company.catchPhrase()}`,
  }
};

// an array of 10 minions, 10 ideas, and 10 work objects
const allMinions = new Array(10).fill(0).map(createMinion);
const allIdeas = new Array(10).fill(0).map(createIdea);
const allWork = allMinions.map(minion => createWork(minion.id));
// an array of 3 meetings
const allMeetings = new Array(3).fill(0).map(createMeeting);

/**
 * 
 * @param {Object} instance - the minion object to be validated. Must include the following properties:
 * - name: {String} (default: empty string) the name of the minion
 * - weaknesses: {String} (default: empty string) the weaknesses of the minion
 * - title: {String} (default: empty string) the title of the minion
 * - salary: {Number} the salary of the minion, this can be a number or a numeric string 
 * @returns {boolean} true if the minion object is valid, false otherwise
 * @throws {Error} if the minion object is not valid. The error message will indicate which property is invalid.
 * if the name, weaknesses, and title properties are not strings
 * if the salary property is not a number
 * @throws {Error} if Salary is not a valid number 
 * 
 */
const isValidMinion = (instance) => {
  instance.name = instance.name || '';
  instance.weaknesses = instance.weaknesses || '';
  instance.title = instance.title || '';
  if (typeof instance.name !== 'string' || typeof instance.weaknesses !== 'string'
  || typeof instance.title !== 'string') {
    throw new Error('Minion\'s name, title, and weaknesses must be strings');
  }
  if (!isNaN(parseFloat(instance.salary)) && isFinite(instance.salary)) {
    instance.salary = Number(instance.salary);
  } else {
    throw new Error('Minion\'s salary must be a number.');
  }
  return true;
};

/**
 * 
 * @param {Object} instance an idea object to be validated. Must include the following properties:
 * - name: {String} (default: empty string) the name of the idea
 * - description: {String} (default: empty string) the description of the idea
 * - numWeeks: {Number} the number of weeks the idea will take to implement
 * - weeklyRevenue: {Number} the weekly revenue of the idea
 * @returns {boolean} true if the idea object is valid, false otherwise
 * @throws {Error} if the idea object is not valid. The error message will indicate which property is invalid.
 * if the name and description properties are not strings
 * if the numWeeks and weeklyRevenue properties are not numbers
 * @throws {Error} if numWeeks and weeklyRevenue are not valid numbers
 */

const isValidIdea = (instance) => {
  instance.name = instance.name || '';
  instance.description = instance.description || '';
  if (typeof instance.name !== 'string' || typeof instance.description !== 'string') {
    throw new Error('Idea\'s name and description must be strings');
  }
  if (!isNaN(parseFloat(instance.numWeeks)) && isFinite(instance.numWeeks)) {
    instance.numWeeks = Number(instance.numWeeks);
  } else {
    throw new Error('Idea\'s numWeeks must be a number.');
  }
  if (!isNaN(parseFloat(instance.weeklyRevenue)) && isFinite(instance.weeklyRevenue)) {
    instance.weeklyRevenue = Number(instance.weeklyRevenue);
  } else {
    throw new Error('Idea\'s weeklyRevenue must be a number.');
  }
  return true;
};

const isValidWork = (instance) => {
  instance.title = instance.title || '';
  instance.description = instance.description || '';
  if (typeof instance.title !== 'string' || typeof instance.description !== 'string') {
    throw new Error('Work\'s title and description must be strings');
  }
  if (!isNaN(parseFloat(instance.hours)) && isFinite(instance.hours)) {
    instance.hours = Number(instance.hours);
  } else {
    throw new Error('Work\'s hours must be a number.');
  }
  let isValidMinionId = db.allMinions.data.find((minion) => {
    return minion.id === instance.minionId;
  });
  if (!isValidMinionId) {
    throw new Error('Work must have a valid minionId that actually exists in the database');
  }
  return true;
};

const isValidMeeting = (instance) => {
  if (typeof instance.time !== 'string' || instance.time.length < 4) {
    throw new Error('Meeting time must be valid!');
  }
  if (!instance.date instanceof Date) {
    throw new Error('Meeting date must be a JS Date object');
  }
  if (!instance.day || typeof instance.day !== 'string') {
    throw new Error('Meeting must have a day property');
  }
  if (!instance.note || typeof instance.note !== 'string') {
    throw new Error('Meeting must have a valid note property');
  }
  return true;
};

const db = {
  allMinions: {
    data: allMinions,
    nextId: minionIdCounter,
    isValid: isValidMinion,
  },
  allIdeas: {
    data: allIdeas,
    nextId: ideaIdCounter,
    isValid: isValidIdea,
  },
  allWork: {
    data: allWork,
    nextId: workIdCounter,
    isValid: isValidWork,
  },
  allMeetings: {
    data: allMeetings,
    nextId: meetingIdCounter,
    isValid: isValidMeeting,
  }
};


const findDataArrayByName = (name) => {
  switch (name) {
    case 'minions':
      return db.allMinions;
    case 'ideas':
      return db.allIdeas;
    case 'work':
      return db.allWork;
    case 'meetings':
      return db.allMeetings;
    default:
      return null;
  }
};

const getAllFromDatabase = (modelType) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  return model.data;
};

const getFromDatabaseById = (modelType, id) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  return model.data.find((element) => {
    return element.id === id;
  });
};

const addToDatabase = (modelType, instance) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  if (model.isValid(instance)) {
    instance.id = `${model.nextId++}`;
    model.data.push(instance);
    return model.data[model.data.length - 1];
  }
};

const updateInstanceInDatabase = (modelType, instance) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  const instanceIndex = model.data.findIndex((element) => {
    return element.id === instance.id;
  });
  if (instanceIndex > -1 && model.isValid(instance)) {
    model.data[instanceIndex] = instance;
    return model.data[instanceIndex];
  } else {
    return null;
  }
};

const deleteFromDatabasebyId = (modelType, id) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  let index = model.data.findIndex((element) => {
    return element.id === id;
  });
  if (index !== -1) {
    model.data.splice(index, 1);
    return true;
  } else {
    return false;
  }
};

const deleteAllFromDatabase = (modelType) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  model.data = [];
  return model.data;
};

module.exports = {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
};
