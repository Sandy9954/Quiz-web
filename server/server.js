const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
console.log(process.env.MONGO_URL);
const userroute = require('./Routes/usersroute');
const examsRoute = require("./Routes/examsRoute");
const resportsRoute = require("./Routes/reportsRoute");
const profileRoute = require('./Routes/profileRoute')

app.use(cors({ origin: 'http://localhost:3000' }));
app.use("/api/users", userroute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", resportsRoute);
app.use("/api/profile", profileRoute)
const port = process.env.PORT || 5000;

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});