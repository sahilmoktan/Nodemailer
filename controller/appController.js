const signup = (req, res) => {
  res.status(201).json("Signup succesfully ...!");
};

const getbill = (req, res) => {
  res.status(201).json("getbill successfully ...!");
};
module.exports = {
  signup,
  getbill,
};
