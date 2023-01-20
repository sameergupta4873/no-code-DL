const mongoose = require("mongoose");



const connectDatabase = () =>{
    mongoose.connect(process.env.DATABASE,{
        useNewUrlParser:true,
        //useCreateIndex:true,
        useUnifiedTopology:true,
        //useFindAndModify:false
    })
    .then(()=> console.log('Mongodb connected '))
    .catch((error)=>console.log(error.message));
}
module.exports = connectDatabase;