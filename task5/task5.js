var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hajer.amairi@esprit.tn',
    pass: 'myzv atfa cecf dtrg'
    
  }
});

var mailOptions = {
  from: 'hajer.amairi@esprit.tn',
  to: 'hajeramairi123@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});