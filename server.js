const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const User = require("./models/users");
const Product = require("./models/product");

//new
const ProductDatas = require("./models/productData");
const multer = require('multer');
const xlsx = require('xlsx');
const mongoose = require("mongoose");
//new
const app = express();
const PORT = 5000;
main();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
   //res.send("hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      
      userAuthCheck = user;
        res.send(user);
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});


app.get("/testget", async (req,res)=>{
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564'})
  res.json(result)

})


//----------FIle upload------------
// Define a mongoose schema and model for the imported data (Products)
// const productSchema = new mongoose.Schema({
//   fsn: { type: String, required: true },
//   wid: { type: String, required: true },
//   warehouse_id: { type: String, required: true },
//   seller_name: { type: String, required: true },
//   brand: { type: String, required: true },
//   model: { type: String, required: true },
//   grade: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   base_rate: { type: Number, required: true },
//   base_discount: { type: Number, required: true },
//   billing_rate: { type: Number, required: true },
// });

// const ProductDatas = mongoose.model('ProductDatas', productSchema);

// Multer storage setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Express route to handle file upload
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//       // Parse Excel file
//       const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//       const sheetName = workbook.SheetNames[0];
//       const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//       // Iterate through each row and check for duplicates before saving to MongoDB
//       for (const data of excelData) {
//           const existingProduct = await ProductDatas.findOne({
//               fsn: data.fsn,
//               wid: data.wid,
//               warehouse_id: data.warehouse_id,
//               seller_name: data.seller_name,
//               brand: data.brand,
//               model: data.model,
//               grade: data.grade,
//           });
//           // const existingProduct = await ProductDatas.findOne({
//           //   fsn: data.fsn,
//           //   wid: data.wid,
//           //   warehouse_id: data.warehouse_id,
//           //   seller_name: data.seller_name,
//           //   brand: data.brand,
//           //   model: data.model,
//           //   grade: data.grade,
//           // }).lean();

//           if (!existingProduct) {
//               // Save data to MongoDB
//               const newProduct = new ProductDatas(data);
//               await newProduct.save();
//           }
//       }

//       res.json({ message: 'File uploaded and data imported successfully!' });
//   } catch (error) {
//       console.error('Error uploading file:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Express route to handle file upload
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     // Parse Excel file
//     const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//     // Iterate through each row and check for duplicates before saving to MongoDB
//     for (const data of excelData) {
    
//       console.log(data);
//       const cleanData = {};
//       Object.keys(data).forEach(key => {
//         const cleanKey = key.trim();
//         cleanData[cleanKey] = data[key];
//       });

//       const existingProduct = await ProductDatas.findOne({
//         fsn: data.fsn,
//         wid: data.wid,
//         warehouse_id: data.warehouse_id,
//         seller_name: data.seller_name,
//         brand: data.brand,
//         model: data.model,
//         grade: data.grade,
//       });

//       if (!existingProduct) {
//         // Save data to MongoDB
//         const newProduct = new ProductDatas(data);
//         await newProduct.save();
//       }
//     }

//     res.json({ message: 'File uploaded and data imported successfully!' });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Parse Excel file
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Iterate through each row and check for duplicates before saving to MongoDB
    for (const data of excelData) {
      // Log the cleaned data
      console.log(data);

      // Clean the data
      const cleanData = {};
      Object.keys(data).forEach(key => {
        const cleanKey = key.trim();
        cleanData[cleanKey] = data[key];
      });

      const existingProduct = await ProductDatas.findOne({
        fsn: cleanData.fsn,
        wid: cleanData.wid,
        warehouse_id: cleanData.warehouse_id,
        seller_name: cleanData.seller_name,
        brand: cleanData.brand,
        model: cleanData.model,
        grade: cleanData.grade,
      });

      if (!existingProduct) {
        // Save cleaned data to MongoDB
        const newProduct = new ProductDatas(cleanData);
        await newProduct.save();
      }
    }

    res.json({ message: 'File uploaded and data imported successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//new

// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     // Parse Excel file
//     const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//     //console.log(sheetName);
//     //console.log(excelData);

//     // Iterate through each row and check for duplicates before saving to MongoDB
//     for (const data of excelData) {
//       try {
//         console.log('Attempting to save data:', data);
//         // Save data to MongoDB
//         // const newProduct = new ProductDatas(data);
//         // await newProduct.save();
//         // Save data to MongoDB using create method
//          await ProductDatas.create(data);
//         console.log('Data saved successfully:', data);
//       } catch (saveError) {
//         console.error('Error saving data to MongoDB:', saveError);
//         console.error('Failed to save data:', data);
//         // Handle the save error as needed
//       }
//     }

//     res.json({ message: 'File uploaded and data imported successfully!' });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

//----------FIle upload------------

app.get("/", async (req,res)=>{
  console.log(main());
  res.json("I am live again")

})
// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again  "+PORT);
});
