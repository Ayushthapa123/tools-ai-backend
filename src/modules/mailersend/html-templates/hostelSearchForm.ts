import { CreateHostelSearchFormInput } from '@src/modules/HostelSearchForm/dtos/hostel-search-form.input';

export const hostelSearchFormTemplate = (
  hostelSearchFormData: CreateHostelSearchFormInput,
) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hostel Search Form submitted for ${hostelSearchFormData.fullName}</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f4f8fb;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 24px;
          }
          .header {
            background: linear-gradient(90deg, #1ec9a7 0%, #0e8a6b 100%);
            color: #fff;
            padding: 32px 0 24px 0;
            border-radius: 12px 12px 0 0;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            letter-spacing: 1px;
          }
          .card {
            background: #fff;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 16px rgba(30, 201, 167, 0.08);
            padding: 32px 24px 24px 24px;
          }
          .section {
            margin-bottom: 28px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e6e6e6;
          }
          .section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          h2 {
            color: #1ec9a7;
            font-size: 20px;
            margin-bottom: 12px;
          }
          p {
            color: #333;
            font-size: 15px;
            margin: 6px 0;
          }
          .footer {
            text-align: center;
            color: #999;
            font-size: 13px;
            margin-top: 32px;
          }
          .brand {
            font-weight: bold;
            color: #0e8a6b;
            letter-spacing: 1px;
          }
          @media (max-width: 600px) {
            .container, .card {
              padding: 12px;
            }
            .header {
              padding: 20px 0 14px 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hostel Search Form Submitted</h1>
            <div style="font-size:16px; margin-top:8px;">for <span class="brand">${hostelSearchFormData.fullName}</span></div>
          </div>
          <div class="card">
            <div class="section">
              <h2>Person Details</h2>
              <p><strong>Name:</strong> ${hostelSearchFormData.fullName}</p>
              <p><strong>Email:</strong> ${hostelSearchFormData.email}</p>
              <p><strong>Phone:</strong> ${hostelSearchFormData.phoneNumber}</p>
              <p><strong>Message:</strong> ${hostelSearchFormData?.notes || 'N/A'}</p>
            </div>
            <div class="section">
              <h2>Hostel Details</h2>
              <p><strong>Location:</strong> ${hostelSearchFormData.address.street}, ${hostelSearchFormData.address.city}, ${hostelSearchFormData.address.country}</p>
              <p><strong>Hostel Gender Type:</strong> ${hostelSearchFormData.hostelGenderType}</p>
              <p><strong>Hostel Type:</strong> ${hostelSearchFormData.hostelType}</p>
            </div>
            <div class="section" style="text-align:center;">
              <h3 style="color:#0e8a6b; margin-bottom:8px;">Thank you for choosing us to find your perfect hostel!</h3>
              <p>We will get back to you as soon as possible.</p>
              <p style="margin-top:18px;">Best regards,<br><span class="brand">The Hostel Finder Team</span><br>by hostelpilot.com</p>
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} HostelPilot.com &mdash; Making hostel search easy.
          </div>
        </div>
      </body>
      </html>
    `;
};
