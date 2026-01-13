import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
    try
    {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: `"Sistema de Adoção" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });

        console.log("Email enviado com sucesso!");
    }
    catch(error)
    {
        console.error("Erro ao enviar email: ", error);
        throw error;
    }
}