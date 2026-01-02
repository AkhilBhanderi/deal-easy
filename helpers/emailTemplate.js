module.exports = {
  forgetPasswordTemplate: async (url) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #212D65;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .button {
          background-color: #212D65;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
        }
        .button:hover {
          background-color: #212D65;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>You requested a password reset for your account. To reset your password, click the button below:</p>
          <a href="${url}" class="button">Reset Password</a>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>Thanks,</p>
          <p>Zeabyte Team</p>
        </div>
      </div>
    </body>
    </html>
    `;
  },
  emailVerificationTemplate: async (url) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verificiation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #212D65;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .button {
          background-color: #212D65;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
        }
        .button:hover {
          background-color: #212D65;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>You requested a email verification for your account. To verify account, click the button below:</p>
          <a href="${url}" class="button">Verify Email</a>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>Thanks,</p>
          <p>Your Website Team</p>
        </div>
      </div>
    </body>
    </html>
    `;
  },
  forgetPasswordForUserTemplate: async (code) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #212D65;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .button {
          background-color: #212D65;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
        }
        .button:hover {
          background-color: #212D65;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>You requested a password reset for your account. To reset your password, click the button below:</p>
          <a href="" class="button">${code}</a>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>Thanks,</p>
          <p>Your Website Team</p>
        </div>
      </div>
    </body>
    </html>
    `;
  },
  resetMFATemplate: async (url) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset MFA</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #212D65;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .button {
          background-color: #212D65;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
        }
        .button:hover {
          background-color: #212D65;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>You requested a password reset for your account. To reset your password, click the button below:</p>
          <a href="${url}" class="button">Reset MFA</a>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>Thanks,</p>
          <p>Your Website Team</p>
        </div>
      </div>
    </body>
    </html>
    `;
  },
};
