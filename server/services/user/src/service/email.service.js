const nodemailer = require('nodemailer')
const config = require('../config')
const ejs = require('ejs')
const path = require('path')

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your provider's SMTP server
  port: 587, // Port may vary depending on your provider
  secure: false, // Use true for TLS, false for non-TLS (consult your provider)
  auth: {
    user: config.EMAIL_USR, // Replace with your email address
    pass: config.EMAIL_PASSWORD // Replace with your email password
  }
})

// Function to send a welcome email
const sendWelcomeEmail = async (user_name, email) => {
  try {
    // Render the EJS template to HTML
    const emailTemplatePath = path.join(__dirname, '../views/emails/welcome.ejs') 
    const htmlContent = await ejs.renderFile(emailTemplatePath, { user_name })

    const mailOptions = {
      from: config.EMAIL_USR, // Replace with your email address
      to: email, // Send to the registered user's email
      subject: 'Welcome to Our Platform!',
      html: htmlContent,
      attachments: [
        {
          filename: 'bannerImage.png', // File name
          path: path.join(__dirname, '../public/email/Numbers Cutout Desktop Wallpaper 3.png'), // Path to your image
          cid: 'bannerImage' // Content-ID for the image
        }
      ]
    }
     
    // Send the email
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error)
      } else {
        console.log(`Email sent: ${info.response}`)
      }
    })
  } catch (err) {
    console.error('Error rendering email template:', err)
  }
}

module.exports = {
  sendWelcomeEmail
}
