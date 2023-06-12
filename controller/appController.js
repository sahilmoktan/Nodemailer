const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");

//send mail from when user signs up
const signup = async (req, res) => {
  const { userEmail } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "moktanshail9@gmail.com",
      pass: "xgwtqnawsjxdrsmy",
    },
  });

  const mailoptions = {
    from: "moktanshail9@gmail.com",
    to: userEmail,
    subject: "nodemailer test 4",
    text: "User signed in",
  };

  transporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};

//send mail from real gmail acccount
const getbill = (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: "EMAIL",
      pass: "PASSWORD",
    },
  };
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    them: "default",
    product: {
      name: "mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: "sahil",
      intro: "your bill has arrived!",
      table: {
        data: [
          {
            item: "nodemailser stack book",
            descriptin: "a backend aplickation",
            price: "rs 150",
          },
        ],
      },
      outro: "looking forward to do more business",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "place order",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
  //   res.status(201).json("getbill successfully ...!");
};

module.exports = {
  signup,
  getbill,
};
