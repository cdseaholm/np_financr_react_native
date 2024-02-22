module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
  
    var router = require("express").Router();

    //authenticate
    router.post("/authenticate", accounts.authenticate);

    //create
    router.post("/register", accounts.create);

    //delete all
    router.delete("/delete-all", accounts.deleteAll);
    
    //delete by email
    router.delete("/delete/:email", accounts.delete);

    //get all  
    router.get("/accounts", accounts.findAll);

    //get by email
    router.get("/get/email/:email", accounts.getByEmail);

    //get by id
    router.get("/get/id/:id", accounts.getById);

    //get by username
    router.get("/get/username/:username", accounts.getByUsername);

    //login
    router.post("/get/login", accounts.loginWithEmail);

    //logout
    router.post("/logout", accounts.logout);

    //update by email
    router.put("/update/account/:email", accounts.update);

    app.use('/api/accounts', router);
  };