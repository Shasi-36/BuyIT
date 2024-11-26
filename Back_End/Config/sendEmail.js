import { Resend } from 'resend';
import dotenv from "dotenv"

dotenv.config()

if(!process.env.RESEND_API){
    console.log("please provide RESEND API URL");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async({sendto,subject,html})=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'BuyIT <onboarding@resend.dev>',
            // from: 'BuyIT <y.shashi114@gmail.com>',
            to: sendto,
            subject: subject,
            html: html,
          });
          if (error) {
            return console.error({ error });
          }
          return data
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail;
