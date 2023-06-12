const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "moktanshail9@gmail.com",
    pass: "xgwtqnawsjxdrsmy",
  },
});

const mailoptions = {
  from: "moktanshail9@gmail.com",
  to: "gobogap768@peogi.com",
  subject: "nodemailer test",
  text: "test sending gmail",
};

transporter.sendMail(mailoptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("email sent:" + info.response);
  }
});
