const express = require('express');
const cors = require('cors');
const app = express();
const localPort = 8000;

require('dotenv').config();
const path = require('path');

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) ); // need these 2 lines in order to use .post method
app.use(cors());

//connect to DB
require("./server/config/mongoose.config");

require('./server/routes/user.routes')(app);
require('./server/routes/post.routes')(app);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(process.env.PORT || localPort, () => console.log(`Listening on port: ${localPort}`) );