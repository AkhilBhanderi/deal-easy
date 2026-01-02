const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

const {
  SEND_MAIL_WITH,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_AUTH_USER,
  EMAIL_AUTH_PASS,
} = require("../constants/env.constant");

const sendMailWithSES = async (to, subject, body) => {
  try {
    const params = {
      Source: SES_SENDER_EMAIL, // Your verified email address in Amazon SES
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: body,
          },
        },
      },
    };

    const ses = new AWS.SES();
    await ses.sendEmail(params).promise();
    return true;
  } catch (error) {
    console.log("SendMailWithSES Error :", error);
    return {
      success: false,
      message: error,
    };
  }
};

const sendMailWithNodemailer = async (to, subject, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: EMAIL_AUTH_USER,
        pass: EMAIL_AUTH_PASS,
      },
    });
    const mailOptions = {
      from: EMAIL_AUTH_USER,
      to: to,
      subject: subject,
      html: body,
    };
    // Use `await` with `sendMail` to handle its asynchronous nature.
    const info = await transporter.sendMail(mailOptions);
    if (info) {
      return { success: true, message: "Email sent!." };
    } else {
      console.log("Send Email Error :", error);
      return {
        success: false,
        message: error,
      };
    }
  } catch (error) {
    console.log("SendMailWithSES Error :", error);
    return {
      success: false,
      message: error,
    };
  }
};

module.exports = {
  sendMailWithServices: async (to, subject, body) => {
    try {
      if (SEND_MAIL_WITH === "SES") {
        console.log("Sending Email With SES.....");
        const result = await sendMailWithSES(to, subject, body);
        return result;
      } else {
        console.log("Send Email With Nodemailer.....");
        const result = await sendMailWithNodemailer(to, subject, body);
        console.log("result", result);
        return result;
      }
    } catch (error) {
      console.log("SendMailWithServices Error :", error);
      return resolve({
        success: false,
        message: error,
      });
    }
  },
};
