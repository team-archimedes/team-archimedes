const db = require('../config.js');

const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false
})