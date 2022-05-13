const {default: mongoose} = require ('mongoose');

const barberSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },

    rating: {
      type: Number,
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model ('Barber', barberSchema);
