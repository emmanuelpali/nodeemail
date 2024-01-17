const express = require('express');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
require('dotenv').config();
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    service: 'zoho',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const emails = ['test@gmail.com'];

const app = express();
const port = 3005;


app.get('/', async(_, res) => {
    const source = fs.readFileSync('email_template.html', 'utf8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        name: 'John Doe',
    }; 
    console.log(process.env.EMAIL)
    const htmlToSend = template(replacements);

    const mailOptions = {
        from: process.env.EMAIL,
        to: emails,
        subject: 'Test email',
        text: 'Hello world',
        html: htmlToSend,
    };
    try{
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        res.send('Email sent');
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
    
});