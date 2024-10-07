module.exports = ({env}) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // url: 'https://0252866d65a8.ngrok.io',
  admin: {
    host: env('HOST', '0.0.0.0'), // only used along with `strapi develop --watch-admin` command
    port: 3000, // only used along with `strapi develop --watch-admin` command
    auth: {

      secret: env('ADMIN_JWT_SECRET', '8fbd28b513d7113ceef09617fc10dd90'),
    },
  },
  cron: {
    enabled: true
  }
});
