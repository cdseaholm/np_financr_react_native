module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    last_login: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    session_id: {
      type: Sequelize.STRING
    },
    session_expires: {
      type: Sequelize.DATE
    },
  });

  return Account;
};