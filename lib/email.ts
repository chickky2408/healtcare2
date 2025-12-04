import nodemailer from 'nodemailer'

// Create email transporter
const createTransporter = () => {
  // Use Gmail SMTP
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use App Password, not regular password
    },
  })
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"HealthCare+ Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request - HealthCare+',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Password Reset Request</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Hello,
                      </p>

                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        We received a request to reset your password for your HealthCare+ account. If you didn't make this request, you can safely ignore this email.
                      </p>

                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        To reset your password, click the button below:
                      </p>

                      <!-- Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 0 0 30px 0;">
                            <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
                        Or copy and paste this link into your browser:
                      </p>

                      <p style="color: #3b82f6; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0; word-break: break-all;">
                        ${resetLink}
                      </p>

                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 0 0 30px 0;">
                        <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0;">
                          <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
                        </p>
                      </div>

                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                        If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                        This is an automated email from HealthCare+. Please do not reply to this email.
                      </p>
                      <p style="color: #94a3b8; font-size: 12px; line-height: 1.6; margin: 0;">
                        © ${new Date().getFullYear()} HealthCare+. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
        Password Reset Request

        Hello,

        We received a request to reset your password for your HealthCare+ account.

        To reset your password, please click the following link or copy it into your browser:

        ${resetLink}

        Important: This link will expire in 1 hour for security reasons.

        If you didn't request a password reset, please ignore this email.

        Best regards,
        HealthCare+ Team
      `,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}
