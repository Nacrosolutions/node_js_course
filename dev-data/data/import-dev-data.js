const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const { deleteMany } = require('../../models/tourModel');
dotenv.config(
  {
    path: './config.env'
  }
)


const DB = process.env.DATEBASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connections Successsful')
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));


//IMPORT Data into DB 

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data succesfully loaded')

  }

  catch (err) {
    console.log(err);
  }
  process.exit()
}

//DELETE ALL DATA  from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data deleted successfully')

  }

  catch (err) {
    console.log(err);

  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
}
else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv)