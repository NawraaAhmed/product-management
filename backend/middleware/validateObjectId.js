const mongoose = require("mongoose");

function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.petId)) {
    return res.status(404).json({ message: "Pet Not Found" });
  }
  next();
}

module.exports = validateObjectId;
