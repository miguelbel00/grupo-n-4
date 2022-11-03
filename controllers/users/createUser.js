const { User } = require("../../database/models");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, avatar, roleId } = req.body;

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        avatar,
        roleId,
      });

      res.status(200).json({
        status: true,
        message: "successful",
        newUser,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
