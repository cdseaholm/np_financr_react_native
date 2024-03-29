const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// Create and Save a new Account
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

  const account = {
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    created_at: Date.now(),
    last_login: Date.now()
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

// Retrieve all Accounts from the database.
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

// Find a single Account with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Account.findByPk(id)
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

// Update an Account by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Account.update(req.body, {
      where: { user_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Account with id=${id}. Maybe Account was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Account with id=" + id
        });
      });
  };

// Delete an Account with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Account.destroy({
      where: { user_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Account with id=" + id
        });
      });
  };

// Delete all Accounts from the database.
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