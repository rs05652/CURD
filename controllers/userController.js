const userModel = require("../models/user");

exports.readUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("read", { users });
  } catch (err) {
    console.log("Error fetching users:", err);
    res.status(500).send("Server Error");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, Email, Image } = req.body;

    const createdUser = await userModel.create({
      name,
      email: Email,
      image: Image
    });

    res.redirect("/read");
  } catch (err) {
    console.log("Error creating user:", err);
    res.status(500).send("Server Error");
  }
};
exports.editUser = async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.params.userId });
    res.render("edit", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user");
  }
};

exports.Update = async (req, res) => {
  const { name, email, image } = req.body; 
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.userid, 
      { name, email, image }, 
      { new: true }
    );
    res.redirect("/read");  
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
  } catch (err) {
    console.log("Error deleting user:", err);
    res.status(500).send("Server Error");
  }
};
