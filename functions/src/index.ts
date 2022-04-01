import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

admin.initializeApp();
dotenv.config();

const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;

interface Contato {
  bairro: string;
  email: string;
  mensagem: string;
  nome: string;
  telefone: string;
}

exports.sendEmailNotification = functions.database.ref("contatos/{contato}")
    .onCreate((snap) => {
      const data: Contato = snap.val();
      const {bairro, email, mensagem, nome, telefone} = data;

      const authData = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        },
      });

      authData.sendMail({
        from: {
          name: "Celmar",
          address: SENDER_EMAIL || "",
        },
        to: [{
          name: "Comercial",
          address: "comercial@celmarrio.com.br",
        },
        {
          name: "Desenvolvedor",
          address: "riquecode@gmail.com",
        }],
        subject: "Nova mensagem do site.",
        text: `Nome: ${nome},
              E-mail: ${email},
              Telefone: ${telefone},
              Bairro: ${bairro},
              Mensagem: ${mensagem};`,
        html: `<h2>Contato</h2>
              <h4>Nome: ${nome}</h4>
              <h4>E-mail: ${email}</h4>
              <h4>Telefone: ${telefone}</h4>
              <h4>Bairro: ${bairro}</h4>
              <p>Mensagem: ${mensagem}</p>`,
      }).catch((err) => console.log(err));
    });
