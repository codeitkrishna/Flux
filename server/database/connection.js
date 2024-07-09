const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionuri = "mongodb+srv://krishna-gupta:Krishna%239175@users.7jrz8lq.mongodb.net/?retryWrites=true&w=majority&appName=Users";


exports.connection = async () => {
    console.log(typeof connectionuri)
    await mongoose.connect(connectionuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(()=> {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Error connecting to database");
        console.log(error);
        process.exit(1)
    });
};

