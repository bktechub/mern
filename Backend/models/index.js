const mongoose = require("mongoose");

// Use the correct variable for the connection string
const url = "mongodb+srv://giranezajeandedieu2:ybP5tuy4TMg4Xa7f@cluster0.c7aff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

function main() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Successful MongoDB connection");
        })
        .catch((err) => {
            console.log("Error: ", err);
        });
}

module.exports = { main };
