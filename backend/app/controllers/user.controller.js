exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.customerBoard = (req, res) => {
  res.status(200).send("Customer Content.");
};

exports.businessBoard = (req, res) => {
  res.status(200).send("Business Content.");
};

exports.acccOfficerBoard = (req, res) => {
  res.status(200).send("ACCC Odficer Content.");
};