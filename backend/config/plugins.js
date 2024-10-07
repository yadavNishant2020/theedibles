module.exports = ({env}) => ({
  email: {
    provider: 'smtp',
    providerOptions: {
      host: 'smtp.gmail.com', //SMTP Host
      port: 465, //SMTP Port
      secure: true,
      username: 'centresourceit@gmail.com',
      password: 'eogdwqlvtptiwflf',
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: 'centresourceit@gmail.com',
      replyTo: 'centresourceit@gmail.com',
      defaultFrom: 'centresourceit@gmail.com',
      defaultReplyTo: 'centresourceit@gmail.com',
      testAddress: 'arshad@centresource.in',
    },
  },
});
