const nodemailer = require("nodemailer");
const signup = async (req, res) => {
  //testing account
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      res
        .status(201)
        .json({
          msg: "you should receive an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  //   res.status(201).json("Signup succesfully ...!");
};

const getbill = (req, res) => {
  res.status(201).json("getbill successfully ...!");
};
module.exports = {
  signup,
  getbill,
};
