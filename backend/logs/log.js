const {createLogger,transports,format} = require('winston');
require('winston-mongodb');

const logger = createLogger({
    // level: 'info',
    // format: winston.format.json(),
    // defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.File({ filename: 'error.log', level: 'error', format:format.combine(format.timestamp(),format.json())}),
      new transports.File({ filename: 'combined.log' }),
    //   new transports.MongoDB({
    //     level:'error',
    //     options:{useUnifiedTopology: true},
    //     db:'mongodb://localhost:27017/orgo',
    //     collection:'log',
    //     format:format.combine(format.timestamp(),format.json())        
    //   })

    ],
  });


//
module.exports={logger};