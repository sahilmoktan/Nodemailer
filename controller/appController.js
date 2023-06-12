const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");

//send mail from testing account
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
      res.status(201).json({
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
