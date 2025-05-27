declare module 'sib-api-v3-sdk' {
  export class ApiClient {
    static instance: {
      authentications: {
        'api-key': {
          apiKey: string;
        };
      };
    };
  }

  export class SendSmtpEmail {
    subject: string;
    htmlContent: string;
    sender: {
      name: string;
      email: string;
    };
    to: Array<{
      email: string;
      name: string;
    }>;
  }

  export class TransactionalEmailsApi {
    sendTransacEmail(email: SendSmtpEmail): Promise<any>;
  }
}
