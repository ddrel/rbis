const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./app');

app.set('port', process.env.PORT || 9090);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});



/*
if (cluster.isMaster){
    console.log('master Cluster .....')
    for(var i=0;i<numCPUs;i++){
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died restart...`);
        cluster.fork();
    });

    cluster.fork().on('disconnect', (worker) => {
        console.log(`worker ${worker.process.pid} disconnect`);
    });



 }else{     
     console.log(`Worker ${process.pid} started`);      
    app.listen(app.get('port'), ()=> {
        console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
    });
 }  
 

*/      


// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
    //console.log('error detail: ' + err);
     res.status(err.status || 500);
     res.render('error', {
         message: err.message,
         error: err,
         errorComplete : JSON.stringify(err)
     });
 });
*/