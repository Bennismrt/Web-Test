const Booking = require ('../Model/Booking');

// getBooking
const GetBooking = async (req, res) => {
  try {
    const booking = await Booking.find({
      user: req.user.id
    }).sort({_id:-1}).limit(1);
    return res.status (200).json (booking);
  } catch (error) {
    return res.status (500).json (error);
  }
};


// create BarberMan
const CreateBooking = async (req, res) => {
    const user = req.user.id;
    const createBooking = new Booking({
        user: user,
        product: req.body.product,
        barber: req.body.barber,
        date: new Date(req.body.date),
        time: req.body.time,
        payment: req.body.payment,
        totalPrice: req.body.totalPrice,
    })
    try {
      const addBooking = await createBooking.save();
      return res.status (200).json (addBooking);
    } catch (error) {
      return res.status (500).json (error);
    }
  };

module.exports = {
  GetBooking,
  CreateBooking,
};