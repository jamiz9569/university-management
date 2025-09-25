const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://jamizalam:Jamiz%401234@cluster0.i25c5gs.mongodb.net/College-Management-System?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
