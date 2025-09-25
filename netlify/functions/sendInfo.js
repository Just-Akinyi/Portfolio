const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod === "POST") {
    const { device, country } = JSON.parse(event.body);

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Use environment variables for sensitive data
        pass: process.env.EMAIL_PASS   // Use environment variables for sensitive data
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,  // Sender email
      to: 'justinakinyi41@gmail.com',  // Receiver email
      subject: 'New Website Visit Info',
      text: `Device: ${device}\nCountry: ${country}`
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Email sent successfully!" })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error sending email", error: error.message })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" })
  };
};

