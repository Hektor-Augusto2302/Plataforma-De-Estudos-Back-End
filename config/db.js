const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
let isFirstRun = true;

const conn = async() => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.gggby8c.mongodb.net/`
        );

        if (isFirstRun) {
            console.log("Conectou ao mongoose");
            isFirstRun = false;
        };

        return dbConn;
    } catch (error) {
        console.log(error)
    }
};

conn();

module.exports = conn;