const { sequelize } = require('./models');

// eslint-disable-next-line
(async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line
    console.log('🔌 connection to db has been established successfully');
  } catch (error) {
    // eslint-disable-next-line
    console.error(`there was a problem connecting to the db: ${error.message}`);
    return;
  }
})();
