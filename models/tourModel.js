const mongoose = require('mongoose');
// const User =require('./userModel')
// const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      // required: [true, 'a tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      // required:[true,' a tour must have a group size']
    },
    difficult: {
      type: String,
      // required:[true,'A tour must have a difficult'] ,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficult must be easy,medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'a tour must have price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      // required: [true, 'a tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    locations :[
      {
        type :{
          type:String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates:[Number],
        address: String,
        description: String,
        day :Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    // guides: Array,
    imageCover: {
      type: String,
      // required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],

    startLocation:{
      // GeoJSON to specify geospatial data
      type :{
        type :String,
        default : 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews',{
  ref: 'Review',
  foreignField :'tour',
  localField: '-id'
});

// DOCUMENT MIDDLEWARE : RUNS BEFORE .SAVE() AND .CREATE ()

// tourSchema.pre('save',function(){
//     this.slug =slugify(this.name,{lower :true})
// })

// tourSchema.pre('save', async function(next){
//   const guidesPromises=this.guides.map(async(id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises)

//   next();
// });
tourSchema.pre(/^find/, function(next){
  this.populate({
    path:'guides',
    select:'-__v -passwordConfirm'
  })
  next();
})

const Tour = mongoose.model('Tour', tourSchema);
module.exports.Tour = Tour;
