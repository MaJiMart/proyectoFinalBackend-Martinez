export default{
  port: process.env.PORT || 8080,
  persistence: process.env.PERSISTENCE || 'mongodb',
  env: process.env.ENV || 'dev',
  mongodbUri: process.env.MONGODB_URI,
  mongodbTest: process.env.MONGODB_TEST,
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URI,
  mail: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    port: process.env.EMAIL_PORT || 587,
    userEmail: process.env.GMAIL_USER,
    userPass: process.env.GMAIL_PASS,
  },
  twilio: {
    accountSID: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  }
}