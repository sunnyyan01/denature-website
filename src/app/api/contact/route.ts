import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// 初始化 SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    console.log('Received form submission:', { name, email, subject, message });

    // 设置邮件内容
    const msg = {
      to: 'info@denature.org.au',
      from: 'info@denature.org.au',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Sending email with SendGrid...');
    
    // 发送邮件
    await sgMail.send(msg);
    
    console.log('Email sent successfully');

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
} 