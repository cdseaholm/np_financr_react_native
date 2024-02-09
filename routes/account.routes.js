module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Account
    router.post("/register", accounts.create);
  
    // Retrieve all Accounts
    router.get("/all", accounts.findAll);
  
    // Retrieve a single Account with id
    router.get("/get/:id", accounts.findOne);
  
    // Update a Account with id
    router.put("/update/:id", accounts.update);
  
    // Delete a Account with id
    router.delete("/delete/:id", accounts.delete);
  
    // Delete all Accounts
    router.delete("/delete-all", accounts.deleteAll);
  
    app.use('/api/accounts', router);
  };