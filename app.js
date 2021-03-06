
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();


// 1) Middleawres
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public `))




app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})







// 2) Route Handleres



//User handler///




//Routes

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)





app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter);



app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this url`

  // })

  //Cretae an error

  // const err = new Error(`Can't find ${req.originalUrl} on this url`)
  // err.status = 'fail',
  //   err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this url`, 404));
})

app.use(globalErrorHandler)


//Start the server

module.exports = app
