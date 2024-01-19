const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const User = require("../models/user");
const Role = require("../models/role");
const Address = require("../models/role");
const Items = require("../models/item");

const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const jsonWebToken = require("jsonwebtoken");

var Distance = require("geo-distance");
const checkAuth = require("../../middleware/check-auth");
const isAdmin = require("../../middleware/is-admin");
const isSuperAdmin = require("../../middleware/is-superadmin");
const isVendor = require("../../middleware/is-vendor");

router.get("/", isSuperAdmin, async (req, res, next) => {
  let users;
  const role = req.query.role;
  if (role) {
    const userRole = await Role.findOne({ name: role });

    if (!userRole) {
      return res.status(401).json({
        error: "Role does not exist",
      });
    } else {
      users = await User.find({ role: userRole._id });
    }
  } else {
    users = await User.find();
  }

  return res.status(200).json({
    user: users,
  });
});

router.post("/signup", async (req, res, next) => {
  const roleId = req.body.role;
  let userRole;
  if (roleId === "CUSTOMER") {
    userRole = await Role.findOne({ name: "CUSTOMER" });
  } else if (roleId === "ADMIN") {
    userRole = await Role.findOne({ name: "ADMIN" });
  } else if (roleId === "NUTRITIONIST") {
    userRole = await Role.findOne({ name: "NUTRITIONIST" });
  } else if (roleId === "SUPERADMIN") {
    userRole = await Role.findOne({ name: "SUPERADMIN" });
  } else if (roleId === "VENDOR") {
    userRole = await Role.findOne({ name: "VENDOR" });
  }
  if (!userRole) {
    return res.json(404).json({
      message: "Invalid role",
    });
  }
  bcrypt.hash(
    req.body.password,
    parseInt(process.env.HASH_SECRETE),
    (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      } else {
        const userData = req.body;
        if (userRole) {
          userData["role"] = userRole._id;
        }

        userData["_id"] = mongoose.Types.ObjectId();
        userData["password"] = hash;
        const user = new User(userData);
        user
          .save()
          .then((doc) => {
            return res.status(200).json({
              message: "User created successfully",
              user: doc,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          });
      }
    }
  );
});

router.post("/nearby_hotels", async (req, res, next) => {
  const currentLocation = {
    lat: req.body.lat,
    lon: req.body.lon,
  };
  const role = await Role.findOne({ name: "HOTEL" });
  const roleId = role["_id"];
  const hotels = await User.find({ role: roleId, isActive: true }).populate(
    "role"
  );

  const nearByHotels = hotels.filter((hotel) => {
    const location = hotel.location.defaultLocation;
    const distance = Distance.between(
      currentLocation,
      location
    ).human_readable();
    console.log(distance);
    if (distance["distance"] <= 10) {
      return hotel;
    }
  });
  return res.status(200).json({
    data: nearByHotels,
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;
  if (id === "") {
    return res.status(401).json({ error: "Nothing found" });
  } else {
    User.findById(id)
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(200).json({
            user: doc,
          });
        } else {
          return res
            .status(404)
            .json({ message: "No user found for the provided id" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  }
});

router.delete("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;
  if (id === "") {
    res.status(404).json({
      error: {
        message: "Invalid User ID",
        status: 404,
      },
    });
  }
  User.remove({ _id: id })
    .exec()
    .then((doc) => {
      console.log("Document is deleted");
      return res.status(200).json({
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      console.log("Error detected");
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/softdelete/:id", async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(401).json({ error: "Invalid User Id" });
  }
  const isDeleted = req.query.isDeleted;
  await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { isDeleted: isDeleted } }
  );
  return res.status(200).json({ message: "User Updated Successfully" });
});

router.post("/login", (req, res, next) => {
  const mobileNumber = req.body.mobileNumber;

  User.find({ mobileNumber: mobileNumber })
    .populate("role")
    .then((users) => {
      if (!users || users.length < 1) {
        return res.status(404).json({
          message: "No user found with provided mobile number",
        });
      }
      const password = req.body.password;
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (err) {
          return res.status(404).json({
            error: "Password is not matching",
          });
        }
        if (result) {
          if (!users[0] || !users[0].role || !users[0].role.name) {
            return res.status(401).json({
              error: "Role is not found",
            });
          }
          const token = jsonWebToken.sign(
            {
              mobileNumber: users[0].email,
              userId: users[0]._id,
              role: users[0].role.name,
            },
            process.env.EVENTUM_SECRATE_KEY,
            {
              expiresIn: "365d",
            }
          );
          return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: users[0],
          });
        } else {
          return res.status(401).json({
            error: "Authentication failed",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});

router.post("/changePassword", checkAuth, (req, res, next) => {
  const body = {
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
    userId: req.body.userId,
  };
  if (body.newPassword !== body.confirmPassword) {
    return res.status(403).json({
      message: "New password and confirm passwords are not matching",
    });
  }
  User.findById(body.userId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Invalid user ID",
        });
      } else {
        bcrypt.compare(password, result.password, (err, bcryptResult) => {
          if (err) {
            return res.status(404).json({
              error: "Current Password is not matching",
            });
          }
          if (bcryptResult) {
            User.findByIdAndUpdate(result._id, {
              $set: { password: body.newPassword },
            })
              .then((newResult) => {
                return res.status(404).json({
                  message: "Password Changed Successfully",
                });
              })
              .catch((error) => {
                return res.status(403).json({
                  error: error,
                });
              });
          } else {
            return res.status(401).json({
              error: "Authentication failed",
            });
          }
        });
      }
    })
    .catch((err) => {});
});

router.get("/:id/like", checkAuth, (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({
      message: "No user found with provided userd id",
    });
  } else {
    User.findById(userId)
      .populate("likes")
      .then((user) => {
        return res.status(200).json({
          data: user.get("likes"),
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          error: err,
        });
      });
  }
});

router.post("/:id/like", (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(404).json({
      message: "No user found with provided userd id",
    });
  } else {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        } else {
          const itemId = req.body.itemId;
          Items.findById(itemId)
            .then((item) => {
              if (!item) {
                return res.status(404).json({
                  message: "No item found for the provided item id",
                });
              } else {
                User.updateOne(
                  { _id: userId },
                  {
                    $addToSet: { likes: item._id },
                  },
                  { upsert: true }
                ).then((result) => {
                  return res
                    .status(200)
                    .json({ message: "Added to like list" });
                });
              }
            })
            .catch((err) => {
              return res.status(500).json({
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        error: err;
      });
  }
});

router.post("/current_location/:id", async (req, res, next) => {
  const userId = req.params.id;
  const currentLocation = {
    lat: req.body.location.currentLocation.lat,
    lon: req.body.location.currentLocation.lon,
  };
  User.findByIdAndUpdate(userId, {
    "location.currentLocation": currentLocation,
  })
    .then((result) => {
      return res.status(200).json({
        message: "Current location updated successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Current location updated successfully",
      });
    });
});

router.put("/update_profile/:id", (req, res, next) => {
  const userId = req.params.id;
  const updatedFields = {};

  console.log("Body is : ", req.body);

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((result) => {
      return res.status(200).json({
        message: "User profile updated successfully",
        user: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: error,
      });
    });
});

router.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jsonWebToken.sign(
      { id: user._id },
      process.env.EVENTUM_SECRATE_KEY,
      {
        expiresIn: "1d",
      }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sagar291293@gmail.com",
        pass: "mazq wmhf icqs zjus",
      },
    });

    var mailOptions = {
      from: "sagar291293@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jsonWebToken.verify(
    token,
    process.env.EVENTUM_SECRATE_KEY,
    (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            User.findByIdAndUpdate({ _id: id }, { password: hash })
              .then((u) => res.send({ Status: "Success" }))
              .catch((err) => res.send({ Status: err }));
          })
          .catch((err) => res.send({ Status: err }));
      }
    }
  );
});

module.exports = router;
