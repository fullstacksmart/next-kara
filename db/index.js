const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const createModel = require('./models');
const { dirname, resolve } = require('path');

const adapter = new FileSync(resolve(dirname(''), 'db/db.json'));
const db = low(adapter);

db.defaults({ talents: [], employers: [], organizations: [] }).write();

module.exports = {
  models: {
    Talent: createModel(db, 'talents'),
    Employer: createModel(db, 'employers'),
    Organization: createModel(db, 'organizations'),
    Agency: createModel(db, 'agencies'),
  },
};
