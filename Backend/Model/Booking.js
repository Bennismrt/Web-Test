const {default: mongoose} = require ('mongoose');

const Booking = new mongoose.Schema (
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    barber: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barber',
    },
    ],
    date: {
        type: Date,
    },
    time: {
        type: String,
    },
    payment: {
        type: String,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    
  },
  {timestamps: true}
);

module.exports = mongoose.model ('Booking', Booking);
