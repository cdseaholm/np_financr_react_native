const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const uuid = require('uuid');

function generateSessionId() {
  return uuid.v4();
}

exports.authenticate = (req, res) => {
  const session_id = req.body.session_id;
  // Get the session from the database
  Session.findOne({
    where: {
      id: session_id
    }
  })
  .then(session => {
    if (session) {
      User.findOne({
        where: {
          id: session.userId
        }
      })
      .then(user => {
        res.send({ user: user });
      });
    } else {
      res.status(401).send({ error: 'Invalid session_id' });
    }
  })
  .catch(err => {
    res.status(500).send({ error: 'Server error' });
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;

  Account.findByID(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Account with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Account with id=" + id
      });
    });
};

exports.getByUsername = (req, res) => {
  const username = req.params.username;

  Account.findOne({ where: { username: username } })
      .then(data => {
          if (data) {
              res.send({ usernameIsAvailable: false });
          } else {
              res.send({ usernameIsAvailable: true });
          }
      })
      .catch(err => {
          res.status(500).send({
            message: err.message || "Error retrieving Account with username=" + username
          });
      });
};

exports.checkEmail = (req, res) => {
  const email = req.params.email;
  const password = req.body.password;


  Account.findOne({ where: { email: email } })
      .then(data => {
          if (data) {
              res.send({ emailIsAvailable: false });
          } else {
              res.send({ emailIsAvailable: true });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Error retrieving Account with email=" + email
          });
      });
};

exports.create = async (req, res) => {
  console.log('Request body:', req.body);
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const sessionId = generateSessionId();
  const session_expires = new Date();
  session_expires.setDate(session_expires.getDate() + 10);

  const account = {
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    createdAt: new Date(),
    last_login: new Date(),
    session_id: sessionId,
    session_expires: session_expires
  };

  Account.create(account)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('Error:', err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Account."
      });
    });
};

exports.delete = (req, res) => {
  const email = req.body.email;

  Account.destroy({
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Account was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Account with email=" + email
      });
    });
};

exports.deleteAll = (req, res) => {
  Account.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Accounts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accounts."
      });
    });
};

exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
  
    Account.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving accounts."
        });
      });
};

exports.logout = (req, res) => {
    const session_id = req.body.session_id;
    Session.destroy({
      where: {
        id: session_id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Session was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Session with id=${session_id}. Maybe Session was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Session with id=" + session_id
      });
    });
};

exports.loginWithEmail = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Account.findOne({ where: { email: email } })
    .then(data => {
      if (data) {
        bcrypt.compare(password, data.password, function(err, result) {
          if(result) {
            const user = {
              username: data.username,
              email: data.email,
              createdAt: data.createdAt,
              last_login: data.last_login,
              session_id: data.session_id,
              session_expires: data.session_expires
            };
            res.send({ user: user, loginSuccess: true });
          } else {
            res.send({ loginSuccess: false, message: "Incorrect password:"});
          }
        });
      } else {
        res.send({ loginSuccess: false, message: "Email not found:" });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving Account with email=" + email
      });
    });
};

exports.update = (req, res) => {
    const email = req.body.email;
    const new_last_login = req.body.last_login;
    const new_updatedAt = req.body.updatedAt;
    const new_session_expires = req.body.session_expires;
  
    Account.update(req.body, {
      where: { email: email, last_login: new_last_login, updatedAt: new_updatedAt, session_expires: new_session_expires}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Account with email=${email}. Maybe Account was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Account with email=" + email
        });
      });
};