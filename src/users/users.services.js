const usersControllers = require("./users.controllers");

const getAllUser = (req, res) => {
  usersControllers
    .getAllUsers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  usersControllers
    .getUserById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const registerUser = (req, res) => {
  const { firstName, lastName, phone, birthday, email, password } = req.body;
  if (firstName && lastName && email && password && phone && birthday) {
    usersControllers
      .createUser({
        firstName,
        lastName,
        phone,
        birthday,
        email,
        password,
      })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "All fields must be completed",
      fields: {
        firstName: "string",
        lastName: "string",
        email: "example@example.com",
        password: "string",
        phone: "+57 3162759534",
        birthday: "YYYY/MM/DD",
      },
    });
  }
};

const patchUser = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone, birthday, gender, country } = req.body;
  usersControllers
    .updateUser(id, {
      firstName,
      lastName,
      phone,
      birthday,
      gender,
      country,
    })
    .then((data) => {
      if (data[0]) {
        res
          .status(200)
          .json({ message: `User with ID: ${id}, edited succesfully` });
      } else {
        res.status(400).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  usersControllers
    .deleteUser(id)
    .then((data) => {
      if (data) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getMyUser = (req, res) => {
  const id = req.user.id;
  usersControllers
    .getUserById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const patchMyUser = (req, res) => {
  const id = req.user.id;
  const { firstName, lastName, phone, birthday, gender, country } = req.body;
  usersControllers
    .updateUser(id, {
      firstName,
      lastName,
      phone,
      birthday,
      gender,
      country,
    })
    .then((data) => {
      res.status(200).json({ message: `Your User was edited succesfully` });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
const deleteMyUser = (req, res) => {
  const id = req.user.id;
  usersControllers
    .updateUser(id, { status: "inactive" })
    .then((data) => {
      res.status(200).json({ message: `Your User was deleted succesfully` });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
module.exports = {
  getAllUser,
  getUserById,
  registerUser,
  patchUser,
  deleteUser,
  getMyUser,
  patchMyUser,
  deleteMyUser,
};
