const mongoose = require("mongoose");

// async function mongoConnect() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/ecom");
//     console.log("database connected");
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// mongoConnect();

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});
mongoose.connection.on("connected", () => {
  console.log("mongodb database connected");
});
