const mongoose = require("mongoose");
//const uri = "mongodb://0.0.0.0:27017/inventory";
const uri = "mongodb+srv://balusiva1299:Siva2312@cluster0.avjoegu.mongodb.net/inventory?retryWrites=true&w=majority";

function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };