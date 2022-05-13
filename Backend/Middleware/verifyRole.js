const Role = require ('../Model/Role');

const isAdmin = async (req, res, next) => {
  try {
    const roles = await Role.find ({_id: {$in: req.user.roles}});

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'administrator') {
        next ();
        return;
      }
    }

    return res.status (403).json ({message: 'Require Admin Role!'});
  } catch (error) {
    console.log (error);
    return res.status (500).send ({message: error});
  }
};


module.exports = {
  isAdmin,
};
