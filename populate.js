require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/Cars');
const jsonProducts = require('./products.json');
const uri = process.env.MONGO_URI;

const start = (async () => {
  try {
    await connectDB(uri);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('Upload Successful');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
