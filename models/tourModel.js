const mongoose = require('mongoose');
const slugify = require('slugify')
const validator = require('validator');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
    unique: true,
    maxlength: [40, 'A tour name must have less or equal 40 characters'],
    minlength: [10, 'A tour name must have more or equal 10 characters']
    // validate: [validator.isAlpha, 'Tour Name must only contain characters']

  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have Group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour should have diffficulty'],
    enum:
    {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is easy,medium or difficult'
    }

  },


  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'A rating must be above 1.0'],
    max: [5, ' Arating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {

    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: {

    type: Number,
    validate: {
      validator: function (val) {

        //this only points to current doc on NEW document creation 

        return val < this.price; // 100 < 200 

      },
      message: ' Discount price ({VALUE}) should be below regular price'

    }

  },
  summary: {

    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a Cover image']
  },

  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },

  startDates: [Date],
  secretTours: {
    type: Boolean,
    default: false
  },

},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });


//Creta  a modal
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
})

//Document middleware runs before save and create command only
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
})


tourSchema.pre('save', function (next) {
  console.log('Will save document ...')
  next();
})
//POST 
tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
})



//Query MiddleWare

// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {

  this.find({ secretTours: { $ne: true } })

  this.start = Date.now();


  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took : ${Date.now() - this.start} milliseconds`)
  // console.log(docs);
  next();
})

//Aggregration  MiddleWare 

tourSchema.pre('aggregate', function (next) {

  this.pipeline().unshift({
    $match: {
      secretTours: { $ne: true }
    }
  })
  console.log(this);

  next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour