const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
require('dotenv').config();

var allowedOrigins = process.env.EXPO_PUBLIC_ALLOWED_ORIGINS.split(',');
const PORT = process.env.PORT || 8081;

console.log('Allowed origins: ' + allowedOrigins);

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const { sequelize } = require("./models");
sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cdseaholm application." });
});

require("./routes/account.routes")(app);

app.listen(PORT, '0.0.0.0', function() {
  console.log(`Server is running on port ${PORT}.`);
});

