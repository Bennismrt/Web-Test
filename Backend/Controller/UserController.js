const Users = require ('../Model/User');

//getId
const GetUserById = async (req, res) => {
  try {
    const user = await Users.findById (req.params.id);
    const {refresh_token, ...info} = user._doc;
    return res.status (200).json (info);
  } catch (error) {
    return res.status (500).json (error);
  }
};

module.exports = {
  GetUserById,
};
