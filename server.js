const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION ❤️ shutting down...')
//   console.log(err.name, err.message);
//   process.exit(1);

// })

dotenv.config(
  {
    path: './config.env'
  }
)
const app = require('./app')

const LOCAL_DB = process.env.DATABASE_LOCAL

const DB = process.env.DATEBASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connections Successsful')
})


//Create  a schemea



//Creta a




const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on the port ${port}`)
});


process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION ❤️ shutting down...')
  server.close(() => {
    process.exit(1);
  })

})


