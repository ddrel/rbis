const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
  promiseLibrary: global.Promise,
  useMongoClient: true,
};

const MONGO_CONNECT = {
                       connect:function(cb){
                        mongoose.connect(process.env.MONGODB_BLUEMIX || process.env.MONGODB_DEV  || process.env.MONGODB_LOCAL, options)
                        .then(function() {
                          const admin = new mongoose.mongo.Admin(mongoose.connection.db);
                          admin.buildInfo(function(err, info) {
                            if (err) {
                              console.err(`Error getting MongoDB info: ${err}`);
                            } else {
                              console.log(`Connection to MongoDB (version ${info.version}) opened successfully!`);
                              if(cb) cb(info)
                            }
                          });
                        })
                        .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));

                       } 
}


module.exports = MONGO_CONNECT;