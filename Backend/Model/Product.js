const {default: mongoose} = require ('mongoose');

const productSchema = new mongoose.Schema (
  {
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },

    duration: {
        type: String,
        default: '',
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model ('Product', productSchema);
