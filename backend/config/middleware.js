module.exports = {
  load: {
    before: ['responseTime', 'logger', 'cors', 'responses', 'gzip'],
    order: [
      "Define the middlewares' load order by putting their name in this array in the right order",
    ],
    after: ['parser', 'router'],
  },
  settings: {

    gzip: {
      enabled: true,
      options: {
        br: false
      }
    },
    cors: {
      origin: ['*'],
    },
  /*  "logger": {
      "level": "debug",
      "exposeInContext": true,
      "requests": false
    },*/
    activitylog: {
      enabled: true,
      adminlogdb: ['DELETE',"POST","PUT"], // Array of methods to log to database for admin panel activity
      adminlogconsole: null, // Array of methods to log to console for admin panel activity
      apilogdb: ['DELETE','GET','POST','PUT'], // Array of methods to log to database for api activity
      apilogconsole: null // Array of methods to log to console for api activity
    }
  },

};
