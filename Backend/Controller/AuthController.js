const Users = require ('../Model/User.js');
const CryptoJs = require ('crypto-js');
const Role = require ('../Model/Role');

const jwt = require ('jsonwebtoken');
const User = require ('../Model/User.js');
const jwtDecode = require ('jwt-decode');

const Register = async (req, res) => {
  const {password, confPassword, roles} = req.body;

  if (password !== confPassword)
    return res.status (400).json ('Password is not match');

  const email = await Users.find ({
    email: req.body.email,
  });

  const username = await Users.find ({
    username: req.body.username,
  });

  if (email.length > 0 || username.length > 0)
    return res
      .status (500)
      .json ('Username or Email have been used by other user');

  // const rolesFound = await Role.find ({name: {$in: roles}});
  // console.log (roles);

  // console.log (rolesFound);

  const newUser = new Users ({
    username: req.body.username,
    email: req.body.email,
    // roles: rolesFound.map (role => role._id),
    password: CryptoJs.AES
      .encrypt (password, process.env.SECRET_KEY)
      .toString (),
  });

  //set Roles
  if (req.body.roles) {
    const foundRoles = await Role.find ({name: {$in: roles}});
    newUser.roles = foundRoles.map (role => role._id);
  } else {
    const role = await Role.findOne ({name: 'user'});
    newUser.roles = [role._id];
  }
  try {
    const user = await newUser.save ();
    res.status (201).json (user);
  } catch (error) {
    return res.status (500).json (error);
  }
};

const Login = async (req, res) => {
  const {username} = req.body;
  try {
    let user;
    if (username) {
      user = await Users.findOne ({
        username: username,
      });

      if (!user) {
        user = await Users.findOne ({
          email: username,
        });
      }
    }

    if (!user) return res.status (401).json ('email or username is not found');

    const decryptedPassword = CryptoJs.AES.decrypt (
      user.password,
      process.env.SECRET_KEY
    );

    const originalPass = decryptedPassword.toString (CryptoJs.enc.Utf8);

    if (req.body.password !== originalPass)
      return res.status (401).json ('wrong password');

    const accessToken = jwt.sign (
      {id: user._id, roles: user.roles},
      process.env.ACCESS_TOKEN,
      {expiresIn: process.env.JWT_LIFETIME}
    );

    const refreshToken = jwt.sign (
      {id: user._id, roles: user.roles},
      process.env.REFRESH_TOKEN,
      {expiresIn: process.env.JWT_REFRESH}
    );

    await Users.findByIdAndUpdate (
      user._id,
      {
        $set: {
          refresh_token: refreshToken,
        },
      },
      {$new: true}
    );

    res.cookie ('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: process.env.JWT_REFRESH_TOKEN_MAX,
    });

    const {password, ...info} = user._doc;

    return res.status (200).json ({info, accessToken});
  } catch (error) {
    return res.status (500).json (error);
  }
};

const RefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken)
      return res.status (401).json ('You are not authenticated');
    const reft = jwtDecode (refreshToken);
    const user = await Users.findOne ({
      _id: reft.id,
    });
  

    if (!user) return res.status (403).json ('User not found');

    jwt.verify (refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.status (401);

      const accessToken = jwt.sign (
        {id: user._id, roles: user.roles},
        process.env.ACCESS_TOKEN,
        {expiresIn: process.env.JWT_LIFETIME}
      );
      return res.status (200).json ({accessToken});
    });
  } catch (error) {
    return res.status (500).json (error);
  }
};

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status (401);

  const user = await Users.findOne ({
    refresh_token: refreshToken,
  });
  if (!user) return res.status (403);

  await Users.findByIdAndUpdate (
    user._id,
    {
      set: {
        refresh_token: null,
      },
    },
    {$new: true}
  );
  res.clearCookie ('refreshToken');
  return res.status (200).json ('You are successfully log out');
};

module.exports = {
  Register,
  Login,
  RefreshToken,
  Logout,
};
