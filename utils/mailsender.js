'use strict';
const Worker = require('webworker-threads').Worker;
const nodemailer = require('nodemailer');
/*
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'rbis.opds@gmail.com',
        clientId: process.env.MAILER_clientId,
        clientSecret: process.env.MAILER_clientSecret,
        refreshToken: process.env.MAILER_refreshToken,
        accessToken: process.env.MAILER_accessToken,
        expires: 1484314697598
    }
});

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});
*/

let transporter = nodemailer.createTransport({
    host: 'smtpout.asia.secureserver.net',
    port: 465,
    auth: {user: process.env.MAILER_USER,pass: process.env.MAILER_PASSWORD},
    secure: true
});


const mailer = {
                sendMailGeneral:function(opt){  
                    /*                                      
                    let worker = new Worker(function(){                                            
                        this.onmessage = function (event) {
                            var d = event.data                            
                        }                                                
                    });//end worker                        
                    worker.onmessage = function (event) {
                        console.log(event.data);
                        
                    };
                    worker.postMessage(opt);
                    */
                    let mailOptions = {
                        from: '"RBIS Team" <rbis.opds@gmail.com>',
                        subject: opt.subject || "Message from RBIS Team",
                        to: opt.email,                                                     
                        html: opt.html     
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {console.log(error);}
                        console.log(info)                                                                
                    });
                }
}


module.exports = mailer;
