const {default: mongoose} = require ('mongoose');

const connect = async () => {
  try {
    await mongoose.connect (process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log ('Connected successfully');
  } catch (error) {
    console.log ('Connection failed');
  }
};

module.exports = connect;
