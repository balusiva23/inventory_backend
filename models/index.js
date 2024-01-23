const mongoose = require("mongoose");
//const uri = "mongodb://localhost:27017/inventory";
const uri = "mongodb+srv://balusiva1299:Siva2312@cluster0.avjoegu.mongodb.net/inventory?retryWrites=true&w=majority";

function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

// async function main() {
//     try {
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
//             socketTimeoutMS: 45000, // Socket timeout after 45 seconds
//         });

//         console.log("Connected to MongoDB successfully");
//         // Continue with your application logic here

//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         // Handle the error or exit the application as needed
//     }
// }


// function main() {
//     const uri = "mongodb+srv://balusiva1299:Siva2312@cluster0.avjoegu.mongodb.net/inventory?retryWrites=true&w=majority";
//     //const uri = "mongodb://localhost:27017/inventory";

//     mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
      
      
//     }).then(() => {
//         console.log("Successful");
//     }).catch((err) => {
//         console.log("Error: ", err);
//     });
// }
module.exports = { main };