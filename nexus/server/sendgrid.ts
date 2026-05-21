import nodemailer from 'nodemailer';
import { MailService } from '@sendgrid/mail';

// Check for Gmail configuration first
const useGmail = process.env.GMAIL_APP_PASSWORD && process.env.GOOGLE_CALENDAR_ORGANIZER_EMAIL;

let mailTransporter: nodemailer.Transporter | null = null;
let mailService: MailService | null = null;

if (useGmail) {
  console.log("Configuring Gmail service for email sending");
  // Configure Gmail with app password
  mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_CALENDAR_ORGANIZER_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
} else if (process.env.SENDGRID_API_KEY) {
  console.log("Configuring SendGrid service for email sending");
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn("No email service configured - email sending will be simulated");
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  // Try Gmail first
  if (mailTransporter) {
    try {
      const mailOptions = {
        from: process.env.GOOGLE_CALENDAR_ORGANIZER_EMAIL, // Use the configured Gmail address
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html,
      };

      await mailTransporter.sendMail(mailOptions);
      console.log(`✅ Gmail email sent successfully to ${params.to}`);
      return true;
    } catch (error) {
      console.error('❌ Gmail email error:', error);
      return false;
    }
  }
  
  // Fallback to SendGrid
  if (mailService) {
    try {
      await mailService.send({
        to: params.to,
        from: params.from,
        subject: params.subject,
        text: params.text,
        html: params.html,
      });
      console.log(`✅ SendGrid email sent successfully to ${params.to}`);
      return true;
    } catch (error) {
      console.error('❌ SendGrid email error:', error);
      return false;
    }
  }

  // No email service configured
  console.log('=== EMAIL WOULD BE SENT (No email service configured) ===');
  console.log('To:', params.to);
  console.log('From:', params.from);
  console.log('Subject:', params.subject);
  console.log('Content preview:', params.html?.substring(0, 200) + '...' || params.text?.substring(0, 200) + '...');
  return false;
}