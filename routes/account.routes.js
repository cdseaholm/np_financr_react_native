module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
  
    router.post("/register", accounts.create);
  
    router.get("/all", accounts.findAll);
  
    router.get("/get/id/:id", accounts.checkId);

    router.get("/get/username/:username", accounts.checkUsername);

    router.get("/get/email/:email", accounts.checkEmail);

    router.post("/get/login", accounts.loginWithEmail);
  
    router.put("/update/:id", accounts.update);
  
    router.delete("/delete/:id", accounts.delete);
  
    router.delete("/delete-all", accounts.deleteAll);
  
    app.use('/api/accounts', router);
  };