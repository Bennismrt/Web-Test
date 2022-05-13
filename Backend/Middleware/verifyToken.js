const jwt = require ('jsonwebtoken');

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;

    if (!authHeader)
    return res
      .status (400)
      .send ({message: 'Authorization token not found or incorrect'});

  if (!authHeader.startsWith ('Bearer'))
    return res
      .status (400)
      .send ({message: 'Authorization token not found or incorrect'});

  const token = authHeader && authHeader.trim ().split (' ')[1];
  jwt.verify (token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status (403).json ('Unauthorized');

    req.user = user;
    next ();
  });
};



module.exports = {verify};
