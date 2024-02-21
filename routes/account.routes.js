module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
  
    router.post("/register", accounts.create);

    router.post("/logout", accounts.logout);

    router.post("/authenticate", accounts.authenticate);
  
    router.get("/all", accounts.findAll);
  
    router.get("/get/id/:id", accounts.checkId);

    router.get("/get/username/:username", accounts.checkUsername);

    router.get("/get/email/:email", accounts.checkEmail);

    router.post("/get/login", accounts.loginWithEmail);
  
    router.put("/update/account/:email", accounts.update);
  
    router.delete("/delete/:email", accounts.delete);
  
    router.delete("/delete-all", accounts.deleteAll);
  
    app.use('/api/accounts', router);
  };