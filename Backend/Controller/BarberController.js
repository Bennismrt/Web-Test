const Barber = require ('../Model/BarberMan');

//getBarberMan
const GetBarbers = async (req, res) => {
  try {
    const barber = await Barber.find();
    return res.status (200).json (barber);
  } catch (error) {
    return res.status (500).json (error);
  }
};

// create BarberMan
const CreateBarbers = async (req, res) => {
    const createBarber = new Barber({
        name: req.body.name,
        profilePicture: req.body.profilePicture,
        rating: req.body.rating,
    })
    try {
      const addBarber = await createBarber.save();
      return res.status (200).json (addBarber);
    } catch (error) {
      return res.status (500).json (error);
    }
  };

module.exports = {
  GetBarbers,
  CreateBarbers,
};