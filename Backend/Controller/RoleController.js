const Role = require ('../Model/Role');

const CreateRole = async (req, res) => {
  try {
    const count = await Role.estimatedDocumentCount;

    if (count > 0) return;

    const values = await Promise.all ([
      new Role ({name: 'user'}).save (),
      new Role ({name: 'moderator'}).save (),
      new Role ({name: 'administrator'}).save (),
    ]);

    return res.status (201).json (values);
  } catch (error) {
    return res.status (500).json (error);
  }
};

module.exports = CreateRole;
