const ejs = require('ejs');
const nodemailer = require("nodemailer");

let sendEmail = async ({viewFileName,data,from,to,subject}) => {
    try {
        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
        });
    
        let dataString = await ejs.renderFile('./views/'+viewFileName+'.ejs', data)
        const info = await transport.sendMail({
            from,
            to,
            subject, 
            html: dataString, // html body
        });
        console.log('Message sent :', info.messageId);
    }catch(e){
        throw new Error(e);
    }
}


module.exports = sendEmail;