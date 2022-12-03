const mongoose= require("mongoose");
const uri = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://mernbook:Np8Xp14yoz7slVu1@clusterbook.ajx3zeu.mongodb.net/book?retryWrites=true&w=majority')
// mongoose.connect(uri)
.then(console.log("Login to mongo successful"))
  .catch(console.error);