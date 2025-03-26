const ejs = require('ejs');
const nodemailer = require("nodemailer");

let sendEmail = async ({viewFileName,data,from,to,subject}) => {
    try {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ec956b15c1a18a",
              pass: "973f3c25bf307c"
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