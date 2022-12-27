const config = require('./config.helper');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.mailerInfo.mailerApiKey);

function generateVerifyCode(min = 1000, max = 9999) {
    return Math.floor(Math.random() * (max - min)) + min;
}

async function getMessage(email, code) {
    const options = {
        from: config.mailerInfo.user,
        templateId: config.mailerInfo.mailerTemplateId,
        personalizations: [
            {
                to: [{ email: email }],
                dynamicTemplateData: {
                    CODE: code
                },
            },
        ],
    };
    await sgMail.send(options).catch((error) => {
        return error;
    });
}

module.exports = {
    generateVerifyCode,
    getMessage
};
